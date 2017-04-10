W = window
D = document

class W.cnvRoulette
  constructor: (@canvas) ->
    @ctx = @canvas.getContext('2d')
    @objects = []
    @patterns = {}
    @P =
      background: 'i/roulette-bg.png'
      centerX: @canvas.width / 2
      centerY: @canvas.height / 2
      picture: {width: 54, height: 54}
      chip: {width: 90, height: 82, amount: 15}
      outlineRadius: 32
      speed: 20
      slowdown_step: 3
      minSpeed: 4

  init: (arrRawObject) ->
    l = arrRawObject.length
    if @P.chip.amount > l
      for n in [l...@P.chip.amount]
        j = n % l
        arrRawObject.push JSON.parse(JSON.stringify(arrRawObject[j]))

    for own k, rObj of arrRawObject
      @objects[k] = @createPlayerObj(rObj, k)

    @_l = @objects.length
    @_d = 0
    @_a = 0
    @winner_id = null

    @addPattern(@P.background)

    @status = 'init'

#    @draw()
    return

  start: ->
    if @status == 'init' or @status == 'stop'
      @winner_id = null
      @_a = 0
      @P.speed = 20
      @status = 'spin'
      @draw()

  stop: (id, @afterStop) ->
    @status = 'slowdown'
    j = Math.floor @P.speed / @P.slowdown_step

    for i in [0...@objects.length]
      if @objects[i].id == id
        @winner_id = i if @winner_id == null

    @slowDownTimer = setInterval =>
      if j-- > 0
        @P.speed -= @P.slowdown_step
        @P.speed = @P.minSpeed if @P.speed < @P.minSpeed
    , 1000

  addPattern: (url) ->
    return if @patterns[url] != undefined
    @patterns[url] = false

    img = new Image;
    img.onload = =>
      @patterns[url] = img
      @draw(false)
    img.src = url;

  createPlayerObj: (rawObj, i) ->
    @addPattern(rawObj.picture)
    @addPattern(rawObj.big_picture)
    sObj =
      id: rawObj.id
      num: i
      color: rawObj.color
      picture: rawObj.picture
      big_picture: rawObj.big_picture
      x: (i - 1) * @P.chip.width

  toGray: ->
    imageData = @ctx.getImageData(0, 0, @canvas.width, @canvas.height);
    data = imageData.data;

    i = 0
    while i < data.length
      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
      data[i] = brightness
      data[i + 1] = brightness
      data[i + 2] = brightness
      i+=4

    @ctx.putImageData(imageData, 0, 0);
    return

  drawPlayer: (l, cObj) ->
    @ctx.beginPath()
    @ctx.arc(l + @P.chip.width / 2, @P.centerY, @P.outlineRadius, 0, 2*Math.PI)
    @ctx.strokeStyle = cObj.color
    @ctx.lineWidth = 2
    @ctx.shadowBlur = 6
    @ctx.shadowColor = cObj.color
    @ctx.stroke()

    @ctx.shadowBlur = 0
    if @patterns[cObj.picture]
      @ctx.drawImage(@patterns[cObj.picture], l + (@P.chip.width - @P.picture.width) / 2, (@canvas.height - @P.picture.height) / 2, 54, 54)

  drawWinner: ->
    @ctx.beginPath()
    @ctx.arc(@P.centerX, @P.centerY, 56, 0, 2*Math.PI)
    @ctx.strokeStyle = @objects[@winner_id].color
    @ctx.lineWidth = 3
    @ctx.shadowBlur = 3
    @ctx.shadowColor = @objects[@winner_id].color
    @ctx.stroke()

    @ctx.shadowBlur = 0
    if @patterns[@objects[@winner_id].big_picture]
      @ctx.drawImage(@patterns[@objects[@winner_id].big_picture], @P.centerX - 48, @P.centerY - 48, 96, 96)

  drawPointer: (alpha = 0.1) ->
    mt = 5
    alpha = 1 if alpha > 1
    @ctx.fillStyle = "rgba(238, 23, 23, #{alpha})";
    @ctx.beginPath()
    @ctx.moveTo(@P.centerX - 20, mt)
    @ctx.lineTo(@P.centerX + 20, mt)
    @ctx.lineTo(@P.centerX, 34 + mt)
    @ctx.closePath()
    @ctx.fill()

    @ctx.beginPath()
    @ctx.moveTo(@P.centerX - 20, @canvas.height - mt)
    @ctx.lineTo(@P.centerX + 20, @canvas.height - mt)
    @ctx.lineTo(@P.centerX, @canvas.height - 34 - mt)
    @ctx.closePath()
    @ctx.fill()

  drawBg: () ->
    if @patterns[@P.background]
      @ctx.shadowBlur = 0
      @ctx.drawImage(@patterns[@P.background], -170, 14, 1425, 93)

  draw: (animate = true) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)

    @drawBg()

    if @status == 'spin' or @status == 'slowdown'
      @_d += @P.speed

      if @_d >= @P.chip.width
        @_d = 0
        @objects[@objects.length - 1].x = @objects[0].x
        for i in [0...@objects.length - 1]
          @objects[i].x = @objects[i+1].x

    if @status == 'slowdown'
      if @P.speed <= @P.minSpeed and @objects[@winner_id].x  + 1.5 * @P.chip.width + @_d >= @P.centerX and @objects[@winner_id].x + @P.chip.width / 2 + @_d <= @P.centerX
        @P.speed = 1
        clearInterval @slowDownTimer

      if @P.speed == 1 and @objects[@winner_id].x + @P.chip.width / 2 + @_d >= @P.centerX
        @status = 'stop'
        @afterStop?()

    for i in [0...@objects.length]
      @drawPlayer(@objects[i].x + @_d, @objects[i])

    if @status == 'init' or @status == 'stop'
      @toGray()

    if @status == 'slowdown' or @status == 'stop'
      @drawPointer(@_a += 0.05)

    if @status == 'stop'
      @drawWinner()

    if (@status == 'slowdown' or @status == 'spin' or @status == 'winner_showing') and animate
      callback = (=> @draw())
      requestAnimationFrame callback