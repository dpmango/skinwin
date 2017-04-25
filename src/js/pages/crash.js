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
})();
