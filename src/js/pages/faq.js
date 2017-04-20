(function () {
    $('.question-res').click(function () {
        var $p = $(this).parent(), $ans = $('.question-answer', $p), isOpen = $p.hasClass('is-question-open');

        $ans.slideToggle();
        $p.toggleClass('is-question-open');
    });
})();
