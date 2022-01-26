const gulp = require('gulp');
const del = require('del');
const gulpPug = require('gulp-pug');
const gulpSass = require('gulp-sass')(require('node-sass'));
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
const gulpPlumber = require('gulp-plumber');
const gulpCleanCss = require('gulp-clean-css');
const gulpImageMin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const gulpRigger = require('gulp-rigger');
const browserSync = require('browser-sync').create();

let isBuildFlag = false;


function clean() {
    return del('dist');
}

function fonts() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/static/fonts'))
}

function pugToHtml() {
    return gulp.src('src/*.pug')
        .pipe(gulpPlumber())
        .pipe(gulpPug({
			pretty: true
		}))
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist/'))
}

function scssToCss() {
    return gulp.src('src/base/sass/styles.scss')
        .pipe(gulpPlumber())
        .pipe(gulpSass())
        .pipe(gulpCleanCss(
            {level: 2}
        ))
        .pipe(gulpAutoprefixer())
        .pipe(gulpPlumber.stop())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/static/css/'))
}

function script() {
    return gulp.src('src/components/**/*.js')
        .pipe(gulpBabel({
            // presets: ['@babel/env']
            // presets: ['@babel/preset-env']
            plugins: ['@babel/transform-runtime']
        }))
        .pipe(gulpIf(isBuildFlag, gulpUglify()))
        .pipe(concat('main.js'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/static/js/'))
}

function copyJQuery() {
    return gulp.src('src/base/js/vendors/jquery-3.6.0.min.js')
        .pipe(gulp.dest('dist/static/js/vendors/'))
}

function rigger() {
    return gulp.src('src/*.php')
        .pipe(gulpRigger())
        .pipe(gulp.dest('dist/'))
}

function vendors() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/static/js/vendors/'))
}

function imgMin() {
    return gulp.src([
        'src/images/**/*.{jpg,gif,png,svg}',
        '!src/images/sprite/*'])
        .pipe(gulpImageMin([
            gulpImageMin.gifsicle({interlaced: true}),
            gulpImageMin.mozjpeg({quality: 75, progressive: true}),
            gulpImageMin.optipng({optimizationLevel: 5}),
            gulpImageMin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/static/images/'))
}

function svgSpriteBuild() {
    return gulp.src('src/images/sprite/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                // $('[stroke]').removeAttr('stroke');
                // $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('dist/static/images/sprite'));
}


function setMode(isBuild) {
   return cb => {
       isBuildFlag = isBuild;
       cb();
   }
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('src/**/*.pug', pugToHtml);
    gulp.watch('[src/images/**/*.{jpg,gif,png,svg}, !src/images/sprite/*]', imgMin);
    gulp.watch('src/images/sprite/*', svgSpriteBuild);
    gulp.watch('src/base/js/main.js', script);
    gulp.watch('src/**/*.scss', scssToCss);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
}

const dev = gulp.parallel(fonts, pugToHtml, scssToCss, imgMin, svgSpriteBuild, script, copyJQuery, rigger, vendors);

exports.default = gulp.series(clean, dev, watch);
exports.build = gulp.series(clean, setMode(true), dev);
