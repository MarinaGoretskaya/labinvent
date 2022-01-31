$(document).ready(function() {
    $('button.menu-burger').click(function (event) {
        event.preventDefault();
        $('.mob-menu').fadeIn(400, function () {
            $('.mob-menu')
                .removeClass('closed')
                .addClass('opened');
        });
    });

    $('button.hamburger-closer').click(function (event) {
        event.preventDefault();
        $('.mob-menu').fadeOut(400, function () {
            $('.mob-menu')
                .removeClass('opened')
                .addClass('closed');
        });
    });
    // $(document).mouseup(function (e) {
    //     let div = $('.mob-menu');
    //     if (!div.is(e.target)
    //         && div.has(e.target).length === 0) {
    //         div.hide();
    //     }
    // });

});
