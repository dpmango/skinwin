(function () {
    var $wrap = $('.main-list > .v-scroll-box-wrap');

    $(window).resize(function () {
        $wrap.height($(window).height() - 220 - 150)
    }).trigger('resize');

    var gaList =  VScrollBox.instance('.main-list');

    $('.show_all_participants').click(function () {
        var $n = $(this).next();

        if($n.hasClass('is-hidden')) {
            $n.removeClass('is-hidden');
            var html = '', L = parseInt($(this).attr('data-key')), inRow = 23;
            for(var i = 0; i <= L; i++) {
                html += '<div class="portrait l-offset-m5">' +
                    '<div class="portrait-wrap"><img src="images/assets/Desert5.png" width="37" height="37" alt="userpic"></div>' +
                    '<div class="portrait-popup' + (i % inRow  > inRow / 2 ? ' portrait-popup-tl' : '') + (i >= Math.floor(L / inRow) * inRow ? ' portrait-popup-b' : '') + '">' +
                    '<div class="portrait-popup-wrap">Igor Solomatin</div>' +
                    '</div>' +
                    '</div>';
            }

            $('.v-scroll-box-wrap', $n).append(html);
            VScrollBox.instance($('.v-scroll-box', $n).get(0));
        } else {
            $n.addClass('is-hidden');
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
