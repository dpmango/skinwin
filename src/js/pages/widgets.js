(function () {

    $('body')
        .on('click', '.l-lightbox', function () {
            $(this).fadeOut();
        })
        .on('click', '.l-lightbox-wrap', function () {
            return false;
        })
    ;


    var hBox = null;
    $('.lb-list span').click(function () {
        var i = $(this).index() + 1;

        $('#lb' + i).appendTo('body').fadeIn(function () {
            if(i == 4 && hBox === null)
                hBox = HScrollBox.instance('.h-scroll-box-st4', 0.5);
        });
    });
})();
