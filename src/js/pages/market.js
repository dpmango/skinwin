(function () {
    var $wrap = $('.v-scroll-box-wrap');

    $(window).resize(function () {
        $wrap.height($(window).height() - 220 - 170)
    }).trigger('resize');

    VScrollBox.instance('.v-scroll-box');

    $('.select').each(function () {
        var $s = $(this), $sVal = $('.select-val', $s), $sItems =  $('.select-list div', $s);
        $s.click(function () {
            $s.toggleClass('is-select-open');
        });
        $sItems.click(function () {
            $sVal.text( $(this).text() );
            $s.removeClass('is-select-open');
            return false;
        });
    });
})();
