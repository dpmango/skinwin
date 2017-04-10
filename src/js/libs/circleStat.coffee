D = document
W = window

class W.cnvCircleStat
  constructor: (@canvas) ->
    @ctx = @canvas.getContext('2d')
    @objects = {}
    @_objects = {}
    @patterns = {}
    @P =
      centerX: 300
      centerY: 300
      radius: 217
      isAnimate: false
      sectorMargin: 0.013
      _d: 0.03

  init: (rawSectorObjects) ->
    last_angle = -0.5*Math.PI
    for own k, rObj of rawSectorObjects
      @objects[rObj.id] = @createSectorObj(rObj, last_angle)
      last_angle = @objects[rObj.id].endAngle
    @canvas.onclick = =>
      @P.isAnimate = if @P.isAnimate then false else true
      @draw() if @P.isAnimate
    @draw()
    return

  update: (rawSectorObjects) ->
    last_angle = -0.5*Math.PI

    for own k, rObj of rawSectorObjects
      @_objects[rObj.id] = @createSectorObj(rObj, last_angle)
      last_angle = @_objects[rObj.id].endAngle

      if !@objects[rObj.id]
        @objects[rObj.id] = JSON.parse JSON.stringify @_objects[rObj.id]
        @objects[rObj.id].startAngle = @objects[rObj.id].startAngle + (@objects[rObj.id].endAngle - @objects[rObj.id].startAngle) / 2
        @objects[rObj.id].endAngle = @objects[rObj.id].startAngle

    @P.isAnimate = false
    setTimeout =>
      @P.isAnimate = true
      @draw()
    ,150

    return

  addToPatterns: (url) ->
    return if @patterns[url] != undefined
    @patterns[url] = false

    img = new Image;
    img.onload = =>
      @patterns[url] = img
      @draw(false)
    img.src = url;

  createSectorObj: (rawObj, startAngle) ->
    @addToPatterns(rawObj.picture)
    sObj =
      id: rawObj.id
      type: 'MainSector'
      startAngle: startAngle
      endAngle: startAngle + 2*Math.PI * (rawObj.percent / 100)
      color: rawObj.color
      picture: rawObj.picture
      percent: rawObj.percent

  drawMainCircle: ->
    @ctx.beginPath()
    @ctx.arc(@P.centerX, @P.centerY, @P.radius, 0, 2*Math.PI)
    @ctx.strokeStyle = "#4f7273"
    @ctx.lineWidth = 2
    @ctx.shadowBlur = 0
    @ctx.stroke()

  drawMainSector: (startAngle, endAngle, color) ->
    return if startAngle >= endAngle
    @ctx.beginPath()
    @ctx.arc @P.centerX, @P.centerY, @P.radius, startAngle, endAngle
    @ctx.strokeStyle = color
    @ctx.lineWidth = 6
    @ctx.shadowBlur = 20
    @ctx.shadowColor = color
    @ctx.stroke()

  drawLegend: (cObj) ->
    return if cObj.percent <= 0

    angle = cObj.startAngle + (cObj.endAngle - cObj.startAngle) / 2
    kx = Math.cos(angle)
    ky = Math.sin(angle)
    @ctx.shadowBlur = 0
    _r = @P.radius + 40

    #image
    if @patterns[cObj.picture]
      @ctx.drawImage(@patterns[cObj.picture], @P.centerX + kx * _r - 18, @P.centerY + ky * _r - 18, 36, 36)

    #sign
    @ctx.font="bold 12px serif"
    @ctx.fillStyle = '#fff'
    @ctx.textAlign = 'center';
    @ctx.fillText(cObj.percent.toFixed(1) + '%', @P.centerX + kx * _r, @P.centerY + ky * _r + 4)

    #circle
    @ctx.beginPath()
    @ctx.arc(@P.centerX + kx * _r, @P.centerY + ky * _r, 21, 0, 2*Math.PI)
    @ctx.strokeStyle = cObj.color
    @ctx.lineWidth = 2
    @ctx.stroke()

    # arrow
    @ctx.stroke()
    @ctx.beginPath()
    @ctx.arc(@P.centerX + kx * _r, @P.centerY + ky * _r, 24, angle - 0.2*Math.PI + Math.PI, angle + 0.2*Math.PI + Math.PI)
    @ctx.lineTo(@P.centerX + kx * (_r - 30), @P.centerY + ky * (_r - 30));
    @ctx.fillStyle = cObj.color
    @ctx.lineWidth = 3
    @ctx.closePath()
    @ctx.fill()

  updMainSector: (cObj) ->
    needRedraw = 0

    if _cObj = @_objects[cObj.id]
      if cObj.startAngle < _cObj.startAngle - @P._d
        cObj.startAngle += @P._d; needRedraw = 1
      else if cObj.startAngle > _cObj.startAngle + @P._d
        cObj.startAngle -= @P._d; needRedraw = 1
      else
        cObj.startAngle = _cObj.startAngle

      if cObj.endAngle < _cObj.endAngle - @P._d
        cObj.endAngle += @P._d; needRedraw = 1
      else if cObj.endAngle > _cObj.endAngle + @P._d
        cObj.endAngle -= @P._d; needRedraw = 1
      else
        cObj.endAngle = _cObj.endAngle

      if cObj.percent < _cObj.percent - 0.25
        cObj.percent += 0.25; needRedraw = 1
      else if cObj.percent > _cObj.percent + 0.25
        cObj.percent -= 0.25; needRedraw = 1
      else
        cObj.percent = _cObj.percent
    needRedraw

  draw: (recursive = true) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)
    needRedraw = 0

    @drawMainCircle()

    for own k, cObj of @objects
      if cObj.type == 'MainSector'
        needRedraw += @updMainSector(cObj)
        @drawMainSector(cObj.startAngle + @P.sectorMargin, cObj.endAngle - @P.sectorMargin, cObj.color)
        @drawLegend(cObj)

#    time = new Date()
#    @ctx.font="20px Georgia";
#    @ctx.fillText(needRedraw,10,50)

    if needRedraw then @P.isAnimate = true else @P.isAnimate = false

    if @P.isAnimate and recursive
      callback = (=> @draw())
      requestAnimationFrame callback



toFixed = (f, n = 3) -> parseFloat( f.toFixed(n) )