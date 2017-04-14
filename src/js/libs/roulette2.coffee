W = window
D = document

Number.prototype.degree = ->
  this * Math.PI / 180

class W.CnvRoulette2
  constructor: (@canvas) ->
    @ctx = @canvas.getContext('2d')
    @objects = []
    @patterns = {}
    @P =
      centerX: @canvas.width / 2
      centerY: @canvas.height / 2
      R: @canvas.width/2 - 2
      speed: 5
      slowdown_step: 0.5
      minSpeed: 1

  init: (gameVals) ->
    for v, i in gameVals
      cacheCanv = document.createElement('canvas')
      cacheCanv.width = 60
      cacheCanv.height = 60
      cacheCtx = cacheCanv.getContext('2d')

      cacheCtx.translate(cacheCanv.width/2, cacheCanv.height/2)
      cacheCtx.rotate((i * 360 / gameVals.length).degree())
      cacheCtx.translate(-cacheCanv.width/2, -cacheCanv.height/2)

      cacheCtx.fillStyle = "transparent"
      if v == 'sw'
        cacheCtx.strokeStyle = "#11bfae"
      else if v == 0
        cacheCtx.fillStyle = "#11bfae"
      else if i % 2 == 0
        cacheCtx.strokeStyle = "#132434"
      else
        cacheCtx.strokeStyle = "#e00a0b"

      cacheCtx.beginPath()
      cacheCtx.lineWidth = 2
      cacheCtx.arc(cacheCanv.width/2, 50, 40, (240).degree(), (300).degree())
      cacheCtx.arc(cacheCanv.width/2, 87, 40, (285).degree(), (255).degree(), -1)
      cacheCtx.closePath()
      cacheCtx.stroke()
      cacheCtx.fill()

      cacheCtx.fillStyle = "#fff";
      cacheCtx.font = "13pt Montserrat";
      cacheCtx.textAlign = "center";
      cacheCtx.textBaseline = "middle"
      cacheCtx.fillText(v, cacheCanv.width/2, cacheCanv.height/2);

      @objects[i] = {cache: cacheCtx, val: v, angle: i * 360 / gameVals.length }

    @_d = Math.ceil(360 / (2 * gameVals.length))
    @status = 'init'
#    console.log(@objects)
    @draw(false)
    return

  start: ->
    if @status == 'init' or @status == 'stop'
      @_s = 0
      @winner_angle = null
      @P.speed = 4
      @status = 'spin'
      @draw()

  stop: (id, @afterStop) ->
    @status = 'slowdown'
    j = Math.floor @P.speed / @P.slowdown_step

    for obj, i in @objects
      if obj.val == id
        @winner_angle = obj.angle if @winner_angle == null
    console.log(@winner_angle)
    @slowDownTimer = setInterval =>
      if j-- > 0
        @P.speed -= @P.slowdown_step
        @P.speed = @P.minSpeed if @P.speed < @P.minSpeed
    , 800

  drawBg: ->
    @ctx.beginPath()
    @ctx.strokeStyle = "#ffd800"
    @ctx.lineWidth = 6
    @ctx.arc(@canvas.width/2, @canvas.height/2, @P.R, 0, 2 * Math.PI, -1)
    @ctx.stroke()
    return

  drawVals: ->
    @ctx.shadowBlur = 0
    for obj, i in @objects
      x = (@P.R - 36) * Math.cos( (-90 + i * (360 / 16)).degree() ) + @canvas.width/2 - 30
      y = (@P.R - 36) * Math.sin( (-90 + i * (360 / 16)).degree() ) + @canvas.height/2 - 30
      @ctx.drawImage(obj.cache.canvas, x, y)
    return

  draw: (animate = true) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)

    @drawBg()
    @drawVals()
#
#    @ctx.fillStyle = "#fff";
#    @ctx.font = "30pt Montserrat";
#    @ctx.textAlign = "center";
#    @ctx.textBaseline = "middle"
#    @ctx.fillText(@_s, @canvas.width/2, @canvas.height/2);

    if @status == 'slowdown' and @P.speed == @P.minSpeed and @winner_angle == Math.floor(360 - @_s - 2)
      clearInterval @slowDownTimer
      @status = 'stop'
      @afterStop?()

    if @status == 'spin' or @status == 'slowdown'
      @ctx.translate(@canvas.width/2, @canvas.height/2)
      @ctx.rotate((@P.speed).degree())
      @ctx.translate(-@canvas.width/2, -@canvas.height/2)

      @_s += @P.speed
      @_s = 0 if @_s >= 360

    if (@status == 'slowdown' or @status == 'spin') and animate
      callback = (=> @draw())
      requestAnimationFrame callback