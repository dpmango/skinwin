(function () {
    var scrollHistory;
    $('.tab-link').click(function () {
        var key = $(this).attr('data-key');
        $('.tab-link').removeClass('is-btn-active');
        $(this).addClass('is-btn-active');
        $('.tab').addClass('is-hidden');
        $('.tab-'+key).removeClass('is-hidden');

        if(key == 'history' && !scrollHistory) {
            setTimeout(function () {
                scrollHistory = CvScrollBox.instance( '#rbox1', [8, 277, 0, 207, 67, 0], 7, 55, '#18140a', '#ff9600');
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

    var $range = $('.range'), $rangeWrap = $('.range-wrap', $range), $rangeMarker = $('.range-marker', $range), $rangeLevel = $('.range-level', $range);
    $rangeMarker.on("mousedown", function() {
        var left, proc;
        $(document).on('mousemove.range', function(e) {
            left = e.pageX - $rangeWrap.offset().left;

            if(left <= 0) left = 0;
            else if (left >= $rangeWrap.width()) left = $rangeWrap.width();

            proc = left / ($rangeWrap.width() / 100);

            $rangeLevel.width(left + 5);
            $rangeMarker.css('left', ""+(left)+"px");

            rangeCallback(proc);
        }).on('mouseup.xcm-select-scroller', function() {
            $rangeMarker.css('left', proc +"%");
            $rangeLevel.width(proc +"%");
            $(document).off('.range');
        });
    });
    $range.on("click", function(e) {
        var left, proc;
        left = e.pageX - $rangeWrap.offset().left;

        if(left <= 0) left = 0;
        else if (left >= $rangeWrap.width()) left = $rangeWrap.width();

        proc = left / ($rangeWrap.width() / 100);

        rangeCallback(proc);

        $rangeMarker.css('left', proc +"%");
        $rangeLevel.width(proc +"%");
    });

    var $betVal = $('#bet_val');
    var rangeCallback = function (proc) {
        $betVal.val( parseInt(proc * 100) );
    };

    $(document).ready(function () {
        VScrollBox.instance('.v-scroll-box');
    });
})();
