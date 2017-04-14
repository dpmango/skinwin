// Generated by CoffeeScript 1.12.3
(function() {
  var D, W, toFixed,
    hasProp = {}.hasOwnProperty;

  D = document;

  W = window;

  W.CnvCircleStat = (function() {
    function CnvCircleStat(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.objects = {};
      this._objects = {};
      this.patterns = {};
      this.P = {
        centerX: 300,
        centerY: 300,
        radius: 217,
        isAnimate: false,
        sectorMargin: 0.013,
        _d: 0.03
      };
    }

    CnvCircleStat.prototype.init = function(rawSectorObjects) {
      var k, last_angle, rObj;
      last_angle = -0.5 * Math.PI;
      for (k in rawSectorObjects) {
        if (!hasProp.call(rawSectorObjects, k)) continue;
        rObj = rawSectorObjects[k];
        this.objects[rObj.id] = this.createSectorObj(rObj, last_angle);
        last_angle = this.objects[rObj.id].endAngle;
      }
      this.canvas.onclick = (function(_this) {
        return function() {
          _this.P.isAnimate = _this.P.isAnimate ? false : true;
          if (_this.P.isAnimate) {
            return _this.draw();
          }
        };
      })(this);
      this.draw();
    };

    CnvCircleStat.prototype.update = function(rawSectorObjects) {
      var k, last_angle, rObj;
      last_angle = -0.5 * Math.PI;
      for (k in rawSectorObjects) {
        if (!hasProp.call(rawSectorObjects, k)) continue;
        rObj = rawSectorObjects[k];
        this._objects[rObj.id] = this.createSectorObj(rObj, last_angle);
        last_angle = this._objects[rObj.id].endAngle;
        if (!this.objects[rObj.id]) {
          this.objects[rObj.id] = JSON.parse(JSON.stringify(this._objects[rObj.id]));
          this.objects[rObj.id].startAngle = this.objects[rObj.id].startAngle + (this.objects[rObj.id].endAngle - this.objects[rObj.id].startAngle) / 2;
          this.objects[rObj.id].endAngle = this.objects[rObj.id].startAngle;
        }
      }
      this.P.isAnimate = false;
      setTimeout((function(_this) {
        return function() {
          _this.P.isAnimate = true;
          return _this.draw();
        };
      })(this), 150);
    };

    CnvCircleStat.prototype.addToPatterns = function(url) {
      var img;
      if (this.patterns[url] !== void 0) {
        return;
      }
      this.patterns[url] = false;
      img = new Image;
      img.onload = (function(_this) {
        return function() {
          _this.patterns[url] = img;
          return _this.draw(false);
        };
      })(this);
      return img.src = url;
    };

    CnvCircleStat.prototype.createSectorObj = function(rawObj, startAngle) {
      var sObj;
      this.addToPatterns(rawObj.picture);
      return sObj = {
        id: rawObj.id,
        type: 'MainSector',
        startAngle: startAngle,
        endAngle: startAngle + 2 * Math.PI * (rawObj.percent / 100),
        color: rawObj.color,
        picture: rawObj.picture,
        percent: rawObj.percent
      };
    };

    CnvCircleStat.prototype.drawMainCircle = function() {
      this.ctx.beginPath();
      this.ctx.arc(this.P.centerX, this.P.centerY, this.P.radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = "#4f7273";
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 0;
      return this.ctx.stroke();
    };

    CnvCircleStat.prototype.drawMainSector = function(startAngle, endAngle, color) {
      if (startAngle >= endAngle) {
        return;
      }
      this.ctx.beginPath();
      this.ctx.arc(this.P.centerX, this.P.centerY, this.P.radius, startAngle, endAngle);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 6;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = color;
      return this.ctx.stroke();
    };

    CnvCircleStat.prototype.drawLegend = function(cObj) {
      var _r, angle, kx, ky;
      if (cObj.percent <= 0) {
        return;
      }
      angle = cObj.startAngle + (cObj.endAngle - cObj.startAngle) / 2;
      kx = Math.cos(angle);
      ky = Math.sin(angle);
      this.ctx.shadowBlur = 0;
      _r = this.P.radius + 40;
      if (this.patterns[cObj.picture]) {
        this.ctx.drawImage(this.patterns[cObj.picture], this.P.centerX + kx * _r - 18, this.P.centerY + ky * _r - 18, 36, 36);
      }
      this.ctx.font = "bold 12px serif";
      this.ctx.fillStyle = '#fff';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(cObj.percent.toFixed(1) + '%', this.P.centerX + kx * _r, this.P.centerY + ky * _r + 4);
      this.ctx.beginPath();
      this.ctx.arc(this.P.centerX + kx * _r, this.P.centerY + ky * _r, 21, 0, 2 * Math.PI);
      this.ctx.strokeStyle = cObj.color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.P.centerX + kx * _r, this.P.centerY + ky * _r, 24, angle - 0.2 * Math.PI + Math.PI, angle + 0.2 * Math.PI + Math.PI);
      this.ctx.lineTo(this.P.centerX + kx * (_r - 30), this.P.centerY + ky * (_r - 30));
      this.ctx.fillStyle = cObj.color;
      this.ctx.lineWidth = 3;
      this.ctx.closePath();
      return this.ctx.fill();
    };

    CnvCircleStat.prototype.updMainSector = function(cObj) {
      var _cObj, needRedraw;
      needRedraw = 0;
      if (_cObj = this._objects[cObj.id]) {
        if (cObj.startAngle < _cObj.startAngle - this.P._d) {
          cObj.startAngle += this.P._d;
          needRedraw = 1;
        } else if (cObj.startAngle > _cObj.startAngle + this.P._d) {
          cObj.startAngle -= this.P._d;
          needRedraw = 1;
        } else {
          cObj.startAngle = _cObj.startAngle;
        }
        if (cObj.endAngle < _cObj.endAngle - this.P._d) {
          cObj.endAngle += this.P._d;
          needRedraw = 1;
        } else if (cObj.endAngle > _cObj.endAngle + this.P._d) {
          cObj.endAngle -= this.P._d;
          needRedraw = 1;
        } else {
          cObj.endAngle = _cObj.endAngle;
        }
        if (cObj.percent < _cObj.percent - 0.25) {
          cObj.percent += 0.25;
          needRedraw = 1;
        } else if (cObj.percent > _cObj.percent + 0.25) {
          cObj.percent -= 0.25;
          needRedraw = 1;
        } else {
          cObj.percent = _cObj.percent;
        }
      }
      return needRedraw;
    };

    CnvCircleStat.prototype.draw = function(recursive) {
      var cObj, callback, k, needRedraw, ref;
      if (recursive == null) {
        recursive = true;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      needRedraw = 0;
      this.drawMainCircle();
      ref = this.objects;
      for (k in ref) {
        if (!hasProp.call(ref, k)) continue;
        cObj = ref[k];
        if (cObj.type === 'MainSector') {
          needRedraw += this.updMainSector(cObj);
          this.drawMainSector(cObj.startAngle + this.P.sectorMargin, cObj.endAngle - this.P.sectorMargin, cObj.color);
          this.drawLegend(cObj);
        }
      }
      if (needRedraw) {
        this.P.isAnimate = true;
      } else {
        this.P.isAnimate = false;
      }
      if (this.P.isAnimate && recursive) {
        callback = ((function(_this) {
          return function() {
            return _this.draw();
          };
        })(this));
        return requestAnimationFrame(callback);
      }
    };

    return CnvCircleStat;

  })();

  toFixed = function(f, n) {
    if (n == null) {
      n = 3;
    }
    return parseFloat(f.toFixed(n));
  };

}).call(this);

//# sourceMappingURL=circleStat.js.map
