(function () {
    $(document).ready(function () {
        HScrollBox.instance('#sbx1', 1, false, true);
        HScrollBox.instance('#sbx2', 1, false, true);
        HScrollBox.instance('#sbx3', 1);
    });

    var $coin = $('.coinflip'), isCoinFlipping = false;
    $coin.click(function () {
        if(!isCoinFlipping) {
            isCoinFlipping = true;
            $coin.attr('class', 'coinflip');
            setTimeout(function () {
                $coin.addClass('coinflip-animate-flipping-' + Math.ceil(Math.random() * 2));
            }, 100);
            setTimeout(function () {
                isCoinFlipping = false;
            }, 5500);
        }
    });
})();
