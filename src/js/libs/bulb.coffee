W = window
D = document

class W.CnvBulb
  constructor: (@canvas) ->
    @ctx = @canvas.getContext('2d')
    @patterns = {}
    @P =
      r: 190
      background: 'i/crash-bg.jpg'
      cx: @canvas.width / 2
      cy: @canvas.height / 2

  init: (p, @drawingCallback) ->
    @addPattern(@P.background)
    @status = 'init'

    @d =
      s: 1
      y1: 35
      y2: -35
      _y1: -35
      _y2: 35
      _y: 2
      p: p
      _p: 0
      ps: 1

    @draw()
    return

  addPattern: (url) ->
    return if @patterns[url] != undefined
    @patterns[url] = false

    img = new Image;
    img.onload = =>
      @patterns[url] = @ctx.createPattern(img, "repeat")
      @draw(false)
    img.src = url;

  setLevel: (p) ->
    @d._p = p;
    @d.ps = 0
    @d.ps = if @d._p > @d.p then 1 else 2

    if @d.ps
      @status = 'flow'
      @draw(true)

  makeWave: ->
    if @d.s == 1
      if @d.y1 >= @d._y1
        @d.y1 -= @d._y

      if @d.y2 <= @d._y2
        @d.y2 += @d._y

      if @d.y2 >= @d._y2
        @d.s = 2
        @d._y1 = 35
        @d._y2 = -35

    if @d.s == 2
      if @d.y1 <= @d._y1
        @d.y1 += @d._y
      if @d.y2 >= @d._y2
        @d.y2 -= @d._y

      if @d.y2 <= @d._y2
        @d.s = 1
        @d._y1 = -35
        @d._y2 = 35

  drawBg: ->
    if @patterns[@P.background]
      @ctx.arc(@P.cx, @P.cy, @P.r, 0, 2 * Math.PI)
      @ctx.fillStyle = @patterns[@P.background];
      @ctx.fill()

  drawLevel: ->
    sa = 0.5 * Math.PI - Math.PI * (@d.p / 100)
    ea = 0.5 * Math.PI + Math.PI * (@d.p / 100)
    r = @P.r + 10

    x2 = @P.cx + Math.cos(sa) * r
    y2 = @P.cy + Math.sin(sa) * r
    x1 = @P.cx + Math.cos(ea) * r
    y1 = @P.cy + Math.sin(ea) * r

    bx1 = x1 + (@P.cx - x1) / 2
    by1 = y1 + @d.y1
    bx2 = x2 - (@P.cx - x1) / 2 - 50
    by2 = y1 + @d.y2

    @ctx.beginPath()
    @ctx.arc(@P.cx, @P.cy, r, sa, ea)
    @ctx.bezierCurveTo(bx1, by1, bx2, by2, x2, y2)
    gradient = @ctx.createLinearGradient(0, y1, 0, @P.cy + r + 100);
    gradient.addColorStop(0, 'rgba(157, 22, 69, 0.8)');
    gradient.addColorStop(1, 'transparent');
    @ctx.fillStyle = gradient;
    @ctx.strokeStyle = "#d21550"
    @ctx.lineWidth = 6
    @ctx.shadowBlur = 0
    @ctx.closePath()
    @ctx.fill()
    @ctx.stroke()

  draw: (animate = true) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)

    if @d.ps
      if @d.ps == 1
        if @d.p <= @d._p
          @d.p += 0.3
          @makeWave()
        else
          @d.ps == 0
          @status = 'stop'

      if @d.ps == 2
        if @d.p >= @d._p
          @d.p -= 0.3
          @makeWave()
        else
          @d.ps == 0
          @status = 'stop'

    @drawingCallback?(@d.p)

#    @drawBg()
    @drawLevel()

    if (@status == 'flow') and animate
      callback = (=> @draw())
      requestAnimationFrame callback