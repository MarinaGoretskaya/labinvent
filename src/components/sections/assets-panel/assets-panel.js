$(document).ready(function() {
    $('button.slider-icon-hide').click(function (event) {
        event.preventDefault();

        $('.assets__wrapper').hide(1000, function () {
            $('.assets-panel')
                .removeClass('opened')
                .addClass('closed');

        });


    });
    $('button.slider-icon-show').click(function (event) {
        event.preventDefault();

        $('.assets__wrapper').show(1000, function () {
            $('.assets-panel')
                .removeClass('closed')
                .addClass('opened');

        });


    });
});
