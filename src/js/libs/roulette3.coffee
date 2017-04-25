W = window
D = document

class W.CnvRoulette3
  constructor: (@canvas) ->
    @ctx = @canvas.getContext('2d')
    @objects = []
    @patterns = {}
    @P =
      background: 'images/roulette-bg2.png'
      centerX: @canvas.width / 2
      centerY: @canvas.height / 2
      chip: {width: 156, height: 106, amount: 9}
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
    @winner_id = null

    @addPattern(@P.background)

    @status = 'init'

    return

  start: ->
    if @status == 'init' or @status == 'stop'
      @winner_id = null
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
    sObj =
      id: rawObj.id
      num: i
      color: rawObj.color
      picture: rawObj.picture
      x: (i - 1) * @P.chip.width

  drawPlayer: (l, cObj) ->
#    console.log "#{l - 1}, #{(@canvas.height - @P.chip.height) / 2 + 20}, #{@P.chip.width - 1}, #{@P.chip.height}"
#    @ctx.stroke()

    if @patterns[cObj.picture]
      @ctx.drawImage(
        @patterns[cObj.picture],
        l + (@P.chip.width - @patterns[cObj.picture].naturalWidth) / 2,
        (@canvas.height - @patterns[cObj.picture].naturalHeight) / 2 + 20,
        @patterns[cObj.picture].naturalWidth,
        @patterns[cObj.picture].naturalHeight
      )

    @ctx.strokeStyle = "rgba(255, 216, 0, 1)"
    @ctx.lineWidth = 2
    @ctx.strokeRect(l - 1, (@canvas.height - @P.chip.height) / 2 + 20, @P.chip.width - 1, @P.chip.height)

  drawPointer: (alpha = 0.1) ->
    mt = 5
    alpha = 1 if alpha > 1
    @ctx.fillStyle = "rgba(255, 216, 0, #{alpha})";
    @ctx.shadowBlur = 10
    @ctx.shadowColor = '#000000'
    @ctx.shadowOffsetX = 5
    @ctx.shadowOffsetY = 5
    @ctx.beginPath()
    @ctx.moveTo(@P.centerX - 28, mt)
    @ctx.lineTo(@P.centerX + 28, mt)
    @ctx.lineTo(@P.centerX, 52 + mt)
    @ctx.closePath()
    @ctx.fill()

    @ctx.shadowBlur = 0
    @ctx.shadowOffsetX = 0
    @ctx.shadowOffsetY = 0

  drawBg: () ->
    @ctx.strokeStyle = "transparent"
    @ctx.fillStyle = "rgba(255, 216, 0, 0.1)"
    @ctx.rect 0, (@canvas.height - @P.chip.height) / 2 + 20, @canvas.width, @P.chip.height
    @ctx.closePath()
    @ctx.fill()

  draw: (animate = true) ->
    @ctx.clearRect 0, 0, @canvas.width, @canvas.height

    @drawBg()

    if @status == 'spin' or @status == 'slowdown'
      @_d += @P.speed

      if @_d >= @P.chip.width
        @_d = 0
        last_x = @objects[@objects.length - 1].x
        @objects[@objects.length - 1].x = @objects[0].x
        for i in [0...@objects.length - 2]
          @objects[i].x = @objects[i+1].x
        @objects[@objects.length - 2].x = last_x

    if @status == 'slowdown'
      if @P.speed <= @P.minSpeed and @objects[@winner_id].x  + 1.5 * @P.chip.width + @_d >= @P.centerX and @objects[@winner_id].x + @P.chip.width / 2 + @_d <= @P.centerX
        @P.speed = 1
        clearInterval @slowDownTimer

      if @P.speed == 1 and @objects[@winner_id].x + @P.chip.width / 2 + @_d >= @P.centerX
        @status = 'stop'
        @afterStop?()

    for i in [0...@objects.length]
      @drawPlayer(@objects[i].x + @_d, @objects[i], 1)

    @drawPointer(1)

    if (@status == 'slowdown' or @status == 'spin' or @status == 'winner_showing') and animate
      callback = (=> @draw())
      requestAnimationFrame callback