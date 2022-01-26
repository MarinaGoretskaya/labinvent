$(document).ready(function() {
    $('button.menu-burger').click(function (event) {
        event.preventDefault();
        $('.mob-menu').fadeIn(400, function () {
            $('.mob-menu')
                // .css('display', 'block')
                .removeClass('closed')
                .addClass('opened');
        });
    });

    $('button.hamburger-closer').click(function (event) {
        event.preventDefault();
        $('.mob-menu').fadeOut(400, function () {
            $('.mob-menu')
            // .css('display', 'block')
                .removeClass('opened')
                .addClass('closed');
        });
    })



    // jQuery(function($){
    //     $(document).mouseup(function (e) {
    //         let div = $('.mob-menu');
    //         if (!div.is(e.target)
    //             && div.has(e.target).length === 0) {
    //             div.hide();
    //         }
    //     });
    // });
});
