(function () {
    var scrollHistory, scrollTopList;
    $('.tab-link').click(function () {
        var key = $(this).attr('data-key');
        $('.tab-link').removeClass('is-btn-active');
        $(this).addClass('is-btn-active');
        $('.tab').addClass('is-hidden');
        $('.tab-'+key).removeClass('is-hidden');

        if(key == 'history' && !scrollHistory) {
            setTimeout(function () {
                scrollHistory = CvScrollBox.instance( '#rbox1', [8, 277, 0, 207, 67, 0], 7,  '#18140a', '#ff9600');
            }, 100);
        }
    });

    var gameVals = ['sw', 11, 5, 12, 6, 13, 7, 14, 0, 1, 8, 2, 9, 3, 10, 4],
        canv = document.getElementById('canvas7'),
        cnvRoulette2 = new CnvRoulette2(canv),
        game = 0;

    cnvRoulette2.init(gameVals);

    $('.roulette2').click(function () {
        if(!game) {
            cnvRoulette2.start(); /* расскручиваем рулетку */
            game = 1;
        } else {
            /* указываем победителя, рулетка постепенно остановится р3 - id победителя */
            cnvRoulette2.stop(5, function(){
                game = 0;
            });
        }
    });

    var $range = $('.range'), $rangeMarker = $('.range-marker', $range), $rangeLevel = $('.range-level', $range);
    $rangeMarker.on("mousedown", function() {
        $(document).on('mousemove.range', function(e) {
            var pK, left;
            left = e.pageX - $range.offset().left;
            if(left <= 4) left = 4;
            else if (left >= 297) left = 297;
            $rangeLevel.width(left+5)
            $rangeMarker.css('transform', "translateX("+left+"px)");
        }).on('mouseup.xcm-select-scroller', function() {
            $(document).off('.range');
        });
    });

    $('.v-scroll-box').each(function () {
        var $box = $(this), $wrap = $('.v-scroll-box-wrap', $box), $bar = $('.v-scroll-box-bar', $box), $marker = $('div', $bar),
            scrollerHeight = $bar.height() / (($wrap.get(0).scrollHeight) / 100);

        $marker.css('height', scrollerHeight+'%');

        $wrap.on('scroll', function () {
            var sT = $wrap.scrollTop();
            var pK = sT / (($wrap.get(0).scrollHeight - $wrap.height()) / 100);
            $marker.css('transform', "translateY("+pK+"%)");
        });
    });
})();
