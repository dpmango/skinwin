(function () {

    var objs2 = [
        {id: 'p1', color: '#afca05', picture: 'images/assets/cs-item1.png'},
        {id: 'p2', color: '#e5007d', picture: 'images/assets/cs-item2.png'},
        {id: 'p3', color: '#ffcc00', picture: 'images/assets/cs-item3.png'}
    ];

    var canv = document.getElementById('roulette3');

    /* создание экземпляра "рулетки" статисики,
     * в кач-ве единственного параметра canvas, на который будет отрисовано изображение */
    var cnvRoulette1 = new CnvRoulette3(canv);
    cnvRoulette1.init(objs2);

    /* пример использования.
     * по клику крутим, по клику останавливаем */
    var game = 0;
    var $lb;
    document.getElementById('btn-spin').onclick = function () {
        if(!game) {
            cnvRoulette1.start(); /* расскручиваем рулетку */
            $lb = $(
                '<div class="l-lightbox l-lightbox-wm" style="display: none;">' +
                    '<div class="l-lightbox-wrap text-center">' +
                        '<img src="images/assets/cs-item3-big.png" alt="csgo-item" />' +
                        '<div class="c-aqua fsz-44-50 tt-upper">congratulations!</div>' +
                        '<div class="fsz-30-35 fw-100 l-offset-mb40">You won Red one</div>' +
                        '<div class="fsz-22-25 fw-100">Time left for next spin:</div>' +
                        '<div class="c-green fsz-18-27">23h. 59min. 4s.</div>' +
                    '</div>' +
                '</div>');
            $('body').prepend($lb);
            game = 1;
        } else {
            /* указываем победителя, рулетка постепенно остановится р3 - id победителя */
            cnvRoulette1.stop('p3', function(){
                $lb.fadeIn();
                game = 0;
            });
        }
    };

    $('body').on('click', '.l-lightbox', function () {
        $(this).fadeOut(function () {
            $(this).remove();
        });
    });
})();
