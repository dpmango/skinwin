var scrollHistory, scrollTopList;
$('.tab-link').click(function () {
    var key = $(this).attr('data-key');
    $('.tab-link').removeClass('is-btn-active');
    $(this).addClass('is-btn-active');
    $('.tab').addClass('is-hidden');
    $('.tab-'+key).removeClass('is-hidden');

    if(key == 'history' && !scrollHistory) {
        setTimeout(function () {
            scrollHistory = cvScrollBox.instance( document.getElementById('rbox1'), '#ff9600' );
        }, 100);
    }else if(key == 'top-list' && !scrollTopList) {
        setTimeout(function () {
            scrollTopList = cvScrollBox.instance( document.getElementById('rbox2'), '#de00ff' );
        }, 100);
    }
});

$('.sandwich').click(function () {
    $(this).toggleClass('is-sandwich-open');
});

$('.chat-btn').click(function () {
    $(this).addClass('is-chat-btn-hidden');
    $('.chat').removeClass('is-chat-hidden');
});

$('.chat-header').click(function () {
    $(this).parent().addClass('is-chat-hidden');
    $('.chat-btn').removeClass('is-chat-btn-hidden');
});

/* СТАТИСТИКА */
/* список секторов с параметрами */
var objs = {
    1: {id: 'a1', percent: 35, color: '#afca05', picture: 'images/assets/Desert3.png'},
    2: {id: 'a2', percent: 35, color: '#e5007d', picture: 'images/assets/Desert3.png'},
    3: {id: 'a3', percent: 30, color: '#ffcc00', picture: 'images/assets/Desert3.png'},
    4: {id: 'a4', percent: 0, color: '#008bd2', picture: 'images/assets/Desert3.png'}
};

/* обновление списка секторов с параметрами
 * id обязательно должны совпадать с первым списком */
var updObjs = {
    1: {id: 'a1', percent: 39.5, color: '#afca05', picture: 'images/assets/Desert3.png'},
    2: {id: 'a2', percent: 10.5, color: '#e5007d', picture: 'images/assets/Desert3.png'},
    3: {id: 'a3', percent: 47.5, color: '#ffcc00', picture: 'images/assets/Desert3.png'},
    4: {id: 'a4', percent: 2.5, color: '#008bd2', picture: 'images/assets/Desert3.png'}
};

/* создание экземпляра "колеса" статисики,
 * в кач-ве единственного параметра canvas, на который будет отрисовано изображение */
var cnvCircleStat = new cnvCircleStat(document.getElementById('canvas1'));

/* инициализация статистики */
cnvCircleStat.init( objs );

/* обновление статистики */
upd = 1;
$('.l-game-cs-stat').click(function () {
    if(upd == 1) {
        cnvCircleStat.update( updObjs );
        upd = 2;
    } else {
        cnvCircleStat.update( objs );
        upd = 1;
    }
});
//setTimeout(function () {
//    cnvCircleStat.update( updObjs );
//}, 2000);


/* кастомные горизонтальные скроллы для блоков */
hScrollBox.instance('#sbx1', 1);
hScrollBox.instance('#sbx2', 0.5);
hScrollBox.instance('#sbx3', 1, true);


/* РУЛЕТКА */

/* объекты "игроков" */
var objs2 = [
    {id: 'p1', color: '#afca05', picture: 'images/assets/Desert4.png', big_picture: 'images/assets/Desert5.png'},
    {id: 'p2', color: '#e5007d', picture: 'images/assets/Koala4.png', big_picture: 'images/assets/Koala4.png'},
    {id: 'p3', color: '#ffcc00', picture: 'images/assets/Penguins4.png', big_picture: 'images/assets/Penguins4.png'}
];

var canv = document.getElementById('canvas2');

/* создание экземпляра "рулетки" статисики,
 * в кач-ве единственного параметра canvas, на который будет отрисовано изображение */
var cnvRoulette = new cnvRoulette(canv);
cnvRoulette.init(objs2);

/* пример использования.
 * по клику крутим, по клику останавливаем */
var game = 0;
var $rW = $('.roulette-winner');
document.getElementsByClassName('roulette')[0].onclick = function () {
    if(!game) {
        cnvRoulette.start(); /* расскручиваем рулетку */
        game = 1;
        $rW.addClass('is-hidden');
    } else {
        /* указываем победителя, рулетка постепенно остановится р3 - id победителя */
        cnvRoulette.stop('p1', function(){
            $rW.removeClass('is-hidden');
            game = 0;
        });
    }
};
