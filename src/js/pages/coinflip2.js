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


    $('.btn-menu .icon').click(function () {
        $(this).parent().toggleClass('is-btn-open');
    });

    // switcher
    $('.switch').each(function () {
        var $t = $(this), $items = $('.switch-item', $t), $nav =  $('.switch-next, .switch-prev', $t), len = $items.length, i = 0;

        $nav.click(function () {
            if($(this).hasClass('switch-next') && i + 1 < len) {
                i++;
            } else if ($(this).hasClass('switch-prev') && i > 0) {
                i--;
            }

            if(i + 1 < len) {
                $nav.filter('.switch-next').removeClass('inactive');
            } else {
                $nav.filter('.switch-next').addClass('inactive');
            }

            if(i == 0) {
                $nav.filter('.switch-prev').addClass('inactive');
            } else {
                $nav.filter('.switch-prev').removeClass('inactive');
            }

            $items.removeClass('is-active').eq(i).addClass('is-active');
        });
    });

})();
