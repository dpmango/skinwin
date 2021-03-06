// Generated by CoffeeScript 1.12.3
(function() {
  var D, W;

  W = window;

  D = document;

  Number.prototype.degree = function() {
    return this * Math.PI / 180;
  };

  W.CnvRoulette2 = (function() {
    function CnvRoulette2(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.objects = [];
      this.patterns = {};
      this.P = {
        centerX: this.canvas.width / 2,
        centerY: this.canvas.height / 2,
        R: this.canvas.width / 2 - 2,
        speed: 6,
        slowdown_step: 0.5,
        minSpeed: 1
      };
    }

    CnvRoulette2.prototype.init = function(gameVals) {
      var cacheCanv, cacheCtx, i, k, len, v;
      for (i = k = 0, len = gameVals.length; k < len; i = ++k) {
        v = gameVals[i];
        cacheCanv = document.createElement('canvas');
        cacheCanv.width = 60;
        cacheCanv.height = 60;
        cacheCtx = cacheCanv.getContext('2d');
        cacheCtx.translate(cacheCanv.width / 2, cacheCanv.height / 2);
        cacheCtx.rotate((i * 360 / gameVals.length).degree());
        cacheCtx.translate(-cacheCanv.width / 2, -cacheCanv.height / 2);
        cacheCtx.fillStyle = "transparent";
        if (v === 'sw') {
          cacheCtx.strokeStyle = "#11bfae";
        } else if (v === 0) {
          cacheCtx.fillStyle = "#11bfae";
        } else if (i % 2 === 0) {
          cacheCtx.strokeStyle = "#132434";
        } else {
          cacheCtx.strokeStyle = "#e00a0b";
        }
        cacheCtx.beginPath();
        cacheCtx.lineWidth = 2;
        cacheCtx.arc(cacheCanv.width / 2, 50, 40, 240..degree(), 300..degree());
        cacheCtx.arc(cacheCanv.width / 2, 87, 40, 285..degree(), 255..degree(), -1);
        cacheCtx.closePath();
        cacheCtx.stroke();
        cacheCtx.fill();
        cacheCtx.fillStyle = "#fff";
        cacheCtx.font = "13pt Montserrat";
        cacheCtx.textAlign = "center";
        cacheCtx.textBaseline = "middle";
        cacheCtx.fillText(v, cacheCanv.width / 2, cacheCanv.height / 2);
        this.objects[i] = {
          cache: cacheCtx,
          val: v,
          angle: i * 360 / gameVals.length
        };
      }
      this._d = Math.ceil(360 / (2 * gameVals.length));
      this.vl = gameVals.length;
      this.status = 'init';
      this.draw(false);
    };

    CnvRoulette2.prototype.start = function() {
      if (this.status === 'init' || this.status === 'stop') {
        this._s = 0;
        this.winner_angle = null;
        this.P.speed = 6;
        this.status = 'spin';
        return this.draw();
      }
    };

    CnvRoulette2.prototype.stop = function(id, afterStop) {
      var i, j, k, len, obj, ref;
      this.afterStop = afterStop;
      this.status = 'slowdown';
      j = Math.floor(this.P.speed / this.P.slowdown_step);
      ref = this.objects;
      for (i = k = 0, len = ref.length; k < len; i = ++k) {
        obj = ref[i];
        if (obj.val === id) {
          if (this.winner_angle === null) {
            this.winner_angle = obj.angle;
          }
        }
      }
      return this.slowDownTimer = setInterval((function(_this) {
        return function() {
          if (j-- > 0) {
            _this.P.speed -= _this.P.slowdown_step;
            if (_this.P.speed < _this.P.minSpeed) {
              return _this.P.speed = _this.P.minSpeed;
            }
          }
        };
      })(this), 800);
    };

    CnvRoulette2.prototype.drawBg = function() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#ffd800";
      this.ctx.lineWidth = 6;
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.P.R, 0, 2 * Math.PI, -1);
      this.ctx.stroke();
    };

    CnvRoulette2.prototype.drawVals = function() {
      var i, k, len, obj, ref, x, y;
      this.ctx.shadowBlur = 0;
      ref = this.objects;
      for (i = k = 0, len = ref.length; k < len; i = ++k) {
        obj = ref[i];
        x = (this.P.R - 36) * Math.cos((-90 + i * (360 / this.vl)).degree()) + this.canvas.width / 2 - 30;
        y = (this.P.R - 36) * Math.sin((-90 + i * (360 / this.vl)).degree()) + this.canvas.height / 2 - 30;
        this.ctx.drawImage(obj.cache.canvas, x, y);
      }
    };

    CnvRoulette2.prototype.draw = function(animate) {
      var callback;
      if (animate == null) {
        animate = true;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBg();
      this.drawVals();
      if (this.status === 'slowdown' && this.P.speed === this.P.minSpeed && this.winner_angle >= (360 - this._s) - 40 && this.winner_angle <= (360 - this._s)) {
        clearInterval(this.slowDownTimer);
        this.P.speed = 0.5;
      }
      if (this.status === 'slowdown' && this.P.speed === 0.5 && this.winner_angle >= (360 - this._s) - this.P.slowdown_step && this.winner_angle <= (360 - this._s) + this.P.slowdown_step) {
        this.status = 'stop';
        if (typeof this.afterStop === "function") {
          this.afterStop();
        }
      }
      if (this.status === 'spin' || this.status === 'slowdown') {
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate(this.P.speed.degree());
        this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
        this._s += this.P.speed;
        if (this._s >= 360) {
          this._s = 0;
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
      if ((this.status === 'slowdown' || this.status === 'spin') && animate) {
        callback = ((function(_this) {
          return function() {
            return _this.draw();
          };
        })(this));
        return requestAnimationFrame(callback);
      }
    };

    return CnvRoulette2;

  })();

}).call(this);

//# sourceMappingURL=roulette2.js.map
