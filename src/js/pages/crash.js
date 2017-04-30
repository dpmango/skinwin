(function () {
    $(document).ready(function () {
        CvScrollBox.instance( '#rbox3', [62, 400, 0, 200, 62, 0], 7, 40, '#18140a', '#11bf6f');
    });

    var canv = document.getElementById('canvas5');
    var dd1 = document.getElementById('dd1');

    dd1.textContent = (3 * 20 / 100).toFixed(2);

    var cnvBulb1 = new CnvBulb(canv);
    cnvBulb1.init(40, function(p){
        dd1.textContent = (3 * p / 100).toFixed(2);
    });

    dd1.onclick = function() {
        cnvBulb1.setLevel(60);
    };


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
