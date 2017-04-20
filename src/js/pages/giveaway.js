(function () {
    var $wrap = $('.v-scroll-box-wrap');

    $(window).resize(function () {
        $wrap.height($(window).height() - 220 - 150)
    }).trigger('resize');

    VScrollBox.instance('.v-scroll-box');
})();
