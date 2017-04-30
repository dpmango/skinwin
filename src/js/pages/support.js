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
