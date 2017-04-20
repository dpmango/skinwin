(function () {
    var $wrap = $('.v-scroll-box-wrap');

    $(window).resize(function () {
        $wrap.height($(window).height() - 220 - 250)
    }).trigger('resize');

    VScrollBox.instance('.v-scroll-box');
})();
