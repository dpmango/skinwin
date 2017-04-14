// Generated by CoffeeScript 1.12.3
(function() {
  var $, D, W;

  $ = jQuery;

  W = window;

  D = document;

  W.CvScrollBox = (function() {
    function CvScrollBox(scrollBoxSelector, coords1, width1, barColor1, dragColor1) {
      this.coords = coords1;
      this.width = width1;
      this.barColor = barColor1 != null ? barColor1 : "#000000";
      this.dragColor = dragColor1 != null ? dragColor1 : "#ffffff";
      if (!scrollBoxSelector || !this.coords || !this.width) {
        console.log('Missed params in constructor');
        return;
      }
      this.jScrBox = $(scrollBoxSelector);
      this.jScrBoxWrap = $(".rscroll-box-wrap", this.jScrBox);
      this.jItems = $(".rscroll-box-item", this.jScrBox);
      this.jItemsWraps = $(".rscroll-box-item-wrap", this.jScrBox);
      $(".scrl-canvas", this.jScrBox).attr('id', (scrollBoxSelector.substr(1)) + "_canvas");
      this.canvas = D.getElementById((scrollBoxSelector.substr(1)) + "_canvas");
      this.ctx = this.canvas.getContext('2d');
      this.scrollerHeight = 0;
      this.step = 25;
      this.max_xt = 70;
      this.jtemParams = [];
    }

    CvScrollBox.instance = function(scrollBoxSelector, coords, width, barColor, dragColor) {
      var inst;
      if (barColor == null) {
        barColor = "#000000";
      }
      if (dragColor == null) {
        dragColor = "#ffffff";
      }
      inst = new this(scrollBoxSelector, coords, width, barColor, dragColor);
      inst.init();
      return inst;
    };

    CvScrollBox.prototype.init = function() {
      this.jScrBoxWrap.scrollTop(0);
      this.jItems.each((function(_this) {
        return function(i) {
          return _this.initItemParams(_this.jItems.eq(i), i);
        };
      })(this));
      this.o1 = this.sectorBy3Dots(this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4], this.coords[5]);
      this.C = {
        x1: this.coords[0],
        y1: this.coords[1],
        x2: this.coords[2],
        y2: this.coords[3],
        x3: this.coords[4],
        y3: this.coords[5]
      };
      this.m = {
        x: 10,
        y: 10
      };
      this.dx = -this.width;
      this.o1.x += this.m.x;
      this.o1.y += this.m.y;
      this.update();
      this.scrollerHeight = this.jScrBox.height() / ((this.jScrBoxWrap.height() + this.jScrBoxWrap.get(0).scrollHeight) / 100);
      this.jScrBoxWrap.on("scroll", (function(_this) {
        return function() {
          var pK, sT;
          sT = _this.jScrBoxWrap.scrollTop();
          pK = 100 - sT / ((_this.jScrBoxWrap.get(0).scrollHeight - _this.jScrBoxWrap.height()) / 100);
          _this.draw(_this.scrollerHeight, pK);
          _this.update();
        };
      })(this));
      return this.jScrBoxWrap.trigger('scroll');
    };

    CvScrollBox.prototype.initItemParams = function(jItem, i) {
      return this.jtemParams[i] = jItem.position().top + (jItem.outerHeight() / 2);
    };

    CvScrollBox.prototype.update = function() {
      var _t, i, j, len, ref, results, y;
      ref = this.jtemParams;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        y = ref[i];
        _t = (function() {
          switch (false) {
            case !(y < this.jScrBoxWrap.scrollTop()):
              return this.max_xt;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step):
              return this.max_xt - 15;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 2):
              return this.max_xt - 15 * 1.2;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 3):
              return this.max_xt - 15 * 2;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 4):
              return this.max_xt - 15 * 2.7;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 5):
              return this.max_xt - 15 * 3.4;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 6):
              return this.max_xt - 15 * 3.6;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 7):
              return this.max_xt - 15 * 4;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 8):
              return this.max_xt - 15 * 4.5;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 9):
              return this.max_xt - 15 * 4.8;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 10):
              return this.max_xt - 15 * 4.5;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 11):
              return this.max_xt - 15 * 4;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 12):
              return this.max_xt - 15 * 3.6;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 13):
              return this.max_xt - 15 * 3.4;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 14):
              return this.max_xt - 15 * 2.7;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 15):
              return this.max_xt - 15 * 2;
            case !(y < this.jScrBoxWrap.scrollTop() + this.step * 16):
              return this.max_xt - 15 * 1.2;
            case !(y < this.jScrBox.height()):
              return this.max_xt;
            default:
              return this.max_xt;
          }
        }).call(this);
        results.push(this.jItemsWraps.eq(i).css('transform', "translateX(" + _t + "px)"));
      }
      return results;
    };

    CvScrollBox.prototype.update2 = function() {
      var _t, _x, _y, i, j, len, ref, results, y;
      ref = this.jtemParams;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        y = ref[i];
        _y = this.jtemParams[i] - this.jScrBoxWrap.scrollTop();
        _x = Math.cos(_y - this.C.y1 - this.o1.y) * (this.o1.r - this.C.x3);
        _t = 0;
        results.push(this.jItemsWraps.eq(i).find('div').html(Math.acos(_y)));
      }
      return results;
    };

    CvScrollBox.prototype.sectorBy3Dots = function(x1, y1, x2, y2, x3, y3) {
      var ea, ma, mb, r, sa, x, y;
      ma = (y2 - y1) / (x2 - x1);
      mb = (y3 - y2) / (x3 - x2);
      x = (ma * mb * (y1 - y3) + mb * (x1 + x2) - ma * (x2 + x3)) / (2 * (mb - ma));
      y = -1 / ma * (x - (x1 + x2) / 2) + (y1 + y2) / 2;
      r = Math.pow(Math.pow(x - x1, 2) + Math.pow(y - y1, 2), 0.5);
      sa = Math.atan((y - y1) / (x - x1));
      ea = Math.atan((y - y3) / (x - x3));
      return {
        x: x,
        y: y,
        r: r,
        sa: sa,
        ea: ea
      };
    };

    CvScrollBox.prototype.drawSectorBar = function() {
      var ea2, sa2;
      this.ctx.beginPath();
      this.ctx.arc(this.o1.x, this.o1.y, this.o1.r, Math.PI + this.o1.sa, Math.PI + this.o1.ea);
      sa2 = Math.asin(Math.sin(this.o1.sa) * this.o1.r / (this.o1.r + this.dx));
      ea2 = Math.asin(Math.sin(this.o1.ea) * this.o1.r / (this.o1.r + this.dx));
      this.ctx.arc(this.o1.x, this.o1.y, this.o1.r + this.dx, Math.PI + ea2, Math.PI + sa2, 1);
      this.ctx.fillStyle = this.barColor;
      this.ctx.strokeStyle = this.barColor;
      this.ctx.shadowBlur = 0;
      this.ctx.closePath();
      return this.ctx.fill();
    };

    CvScrollBox.prototype.drawSectorScroller = function(pW, pT) {
      var ea1, ea2, k1, p1, sa1, sa2, w1;
      if (pW == null) {
        pW = 30;
      }
      if (pT == null) {
        pT = 10;
      }
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = this.color;
      p1 = Math.abs(this.o1.ea - this.o1.sa) / 100;
      w1 = pW * p1;
      k1 = (this.o1.ea - w1 - this.o1.sa) / 100;
      sa1 = this.o1.sa + k1 * pT;
      ea1 = sa1 + w1;
      sa2 = Math.asin(Math.sin(sa1) * this.o1.r / (this.o1.r + this.dx));
      ea2 = Math.asin(Math.sin(ea1) * this.o1.r / (this.o1.r + this.dx));
      this.ctx.beginPath();
      this.ctx.arc(this.o1.x, this.o1.y, this.o1.r, Math.PI + sa1, Math.PI + ea1);
      this.ctx.arc(this.o1.x, this.o1.y, this.o1.r + this.dx, Math.PI + ea2, Math.PI + sa2, 1);
      this.ctx.fillStyle = this.dragColor;
      this.ctx.shadowColor = this.dragColor;
      this.ctx.shadowBlur = 10;
      this.ctx.closePath();
      return this.ctx.fill();
    };

    CvScrollBox.prototype.draw = function(pW, pT) {
      if (pW == null) {
        pW = 10;
      }
      if (pT == null) {
        pT = 0;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawSectorBar();
      this.drawSectorScroller(pW, pT);
    };

    return CvScrollBox;

  })();

}).call(this);

//# sourceMappingURL=jquery.cvScrollBox.js.map