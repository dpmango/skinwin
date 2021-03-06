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
                scrollHistory = CvScrollBox.instance( '#rbox1', [8, 277, 0, 207, 67, 0], 7, 55,  '#18140a', '#ff9600');
            }, 100);
        }else if(key == 'top-list' && !scrollTopList) {
            setTimeout(function () {
                scrollTopList = CvScrollBox.instance( '#rbox2', [8, 277, 0, 207, 67, 0], 7, 55, '#18140a', '#de00ff' );
            }, 100);
        }
    });

    $('.sandwich').click(function () {
        $(this).toggleClass('is-sandwich-open');
    });

    /* ЧАТ */
    var $chat = $('.chat'), $chatTypeBtn = $('.chat-type'), $chatBtn = $('.chat-btn'), $chatList = $('.v-scroll-box'),
        chanelScroll, teamScroll;

    $chatBtn.click(function () {
        $(this).addClass('is-chat-btn-hidden');
        $chat.removeClass('is-chat-hidden');

        if(!chanelScroll)
            chanelScroll = VScrollBox.instance('.chat-list-channel');

        $(document).on("mousedown.chat", function(e) {
            if (!$chat.is(e.target) && $chat.has(e.target).length === 0) {
                $chat.addClass('is-chat-hidden');
                $chatBtn.removeClass('is-chat-btn-hidden');
                $(document).off("mousedown.chat");
            }
        });
    });

    $chatTypeBtn.click(function () {
        var key = $(this).attr('data-key');

        $chatTypeBtn.removeClass('chat-is-type-active');
        $(this).addClass('chat-is-type-active');

        $chatList.addClass('is-hidden')
            .filter('.chat-list-'+key).removeClass('is-hidden');

        if(key == 'team' && !teamScroll)
            teamScroll = VScrollBox.instance('.chat-list-team');
    });

    /* СТАТИСТИКА */
    /* список секторов с параметрами */
    var objs = {
        1: {id: 'a1', percent: 35, color: '#afca05', picture: 'images/assets/dota-item1.png'},
        2: {id: 'a2', percent: 35, color: '#e5007d', picture: 'images/assets/dota-item2.png'},
        3: {id: 'a3', percent: 30, color: '#ffcc00', picture: 'images/assets/dota-item3.png'},
        4: {id: 'a4', percent: 0, color: '#008bd2', picture: 'images/assets/dota-item1.png'}
    };

    /* обновление списка секторов с параметрами
     * id обязательно должны совпадать с первым списком */
    var updObjs = {
        1: {id: 'a1', percent: 39.5, color: '#afca05', picture: 'images/assets/dota-item1.png'},
        2: {id: 'a2', percent: 10.5, color: '#e5007d', picture: 'images/assets/dota-item2.png'},
        3: {id: 'a3', percent: 47.5, color: '#ffcc00', picture: 'images/assets/dota-item3.png'},
        4: {id: 'a4', percent: 2.5, color: '#008bd2', picture: 'images/assets/dota-item1.png'}
    };

    /* создание экземпляра "колеса" статисики,
     * в кач-ве единственного параметра canvas, на который будет отрисовано изображение */
    var cnvCircleStat1 = new CnvCircleStat(document.getElementById('canvas1'));

    /* инициализация статистики */
    cnvCircleStat1.init( objs );

    /* обновление статистики */
    var upd = 1;
    $('.l-game-cs-stat').click(function () {
        if(upd == 1) {
            cnvCircleStat1.update( updObjs );
            upd = 2;
        } else {
            cnvCircleStat1.update( objs );
            upd = 1;
        }
    });

    $(document).ready(function () {
        /* кастомные горизонтальные скроллы для блоков */
        HScrollBox.instance('#sbx1', 1);
        HScrollBox.instance('#sbx2', 0.5);
        HScrollBox.instance('#sbx3', 1, true);
    });

    /* РУЛЕТКА */

    /* объекты "игроков" */
    var objs2 = [
        {id: 'p1', color: '#afca05', picture: 'images/assets/dota-item1.png'},
        {id: 'p2', color: '#e5007d', picture: 'images/assets/dota-item2.png'},
        {id: 'p3', color: '#ffcc00', picture: 'images/assets/dota-item3.png'}
    ];

    var canv = document.getElementById('canvas2');

    /* создание экземпляра "рулетки" статисики,
     * в кач-ве единственного параметра canvas, на который будет отрисовано изображение */
    $(document).ready(function () {
        var cnvRoulette1 = new CnvRoulette(canv);
        cnvRoulette1.init(objs2);

        /* пример использования.
         * по клику крутим, по клику останавливаем */
        var game = 0;
        var $rW = $('.roulette-winner');
        document.getElementsByClassName('roulette')[0].onclick = function () {
            if (!game) {
                cnvRoulette1.start();
                /* расскручиваем рулетку */
                game = 1;
                $rW.addClass('is-hidden');
            } else {
                /* указываем победителя, рулетка постепенно остановится р3 - id победителя */
                cnvRoulette1.stop('p1', function () {
                    $rW.removeClass('is-hidden');
                    game = 0;
                });
            }
        };
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
