window.onscroll = function showHeader() {
    let headerBg = document.querySelector('.header .b-sec__bg');

    if(window.pageYOffset > 70) {
        headerBg.classList.add('header-scroll');
    } else {
        headerBg.classList.remove('header-scroll');
    }
};