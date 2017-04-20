(function () {
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
