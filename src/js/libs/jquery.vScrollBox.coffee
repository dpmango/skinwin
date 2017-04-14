$ = jQuery
W = window
D = document

class W.CvScrollBox
  constructor: (scrollBoxSelector, @coords, @width, @barColor = "#000000", @dragColor = "#ffffff") ->

    if !scrollBoxSelector or !@coords or !@width
      console.log 'Missed params in constructor'
      return

    @jScrBox = $ scrollBoxSelector
    @jScrBoxWrap = $ ".rscroll-box-wrap", @jScrBox
    @jItems = $ ".rscroll-box-item", @jScrBox
    @jItemsWraps = $ ".rscroll-box-item-wrap", @jScrBox
    console.dir(scrollBoxSelector)

    $(".scrl-canvas", @jScrBox).attr('id', "#{scrollBoxSelector.substr(1)}_canvas")
    @canvas = D.getElementById("#{scrollBoxSelector.substr(1)}_canvas")

    @ctx = @canvas.getContext('2d')

    @scrollerHeight = 0
    @step = 25
    @max_xt = 70
    @jtemParams = []

  @instance: (scrollBoxSelector, coords, width, barColor = "#000000", dragColor = "#ffffff") ->
    inst = new @ scrollBoxSelector, coords, width, barColor, dragColor
    inst.init()
    inst

  init: ->
    @jScrBoxWrap.scrollTop(0)

    @jItems.each (i) =>
      @initItemParams(@jItems.eq(i), i)

    @o1 = @sectorBy3Dots(@coords[0], @coords[1], @coords[2], @coords[3], @coords[4], @coords[5]);
    @C = {x1: @coords[0], y1: @coords[1], x2: @coords[2], y2: @coords[3], x3: @coords[4], y3: @coords[5]}
    @m = {x: 10, y: 10}
    @dx = -@width

    @o1.x += @m.x
    @o1.y += @m.y

    @update()

    @scrollerHeight = @jScrBox.height() / ( (@jScrBoxWrap.height() + @jScrBoxWrap.get(0).scrollHeight) / 100 )

    @jScrBoxWrap.on "scroll", =>
      sT = @jScrBoxWrap.scrollTop()
      pK = 100 - sT / ((@jScrBoxWrap.get(0).scrollHeight - @jScrBoxWrap.height()) / 100)
      @draw(@scrollerHeight, pK)
      @update()
      return

    @jScrBoxWrap.trigger('scroll')

  initItemParams: (jItem, i) ->
    @jtemParams[i] = jItem.position().top + (jItem.outerHeight() / 2)

  update: () ->
    for y, i in @jtemParams
      _t = switch
        when y < @jScrBoxWrap.scrollTop() then @max_xt
        when y < @jScrBoxWrap.scrollTop() + @step then @max_xt - 15
        when y < @jScrBoxWrap.scrollTop() + @step * 2 then @max_xt - 15 * 1.2
        when y < @jScrBoxWrap.scrollTop() + @step * 3 then @max_xt - 15 * 2
        when y < @jScrBoxWrap.scrollTop() + @step * 4 then @max_xt - 15 * 2.7
        when y < @jScrBoxWrap.scrollTop() + @step * 5 then @max_xt - 15 * 3.4
        when y < @jScrBoxWrap.scrollTop() + @step * 6 then @max_xt - 15 * 3.6
        when y < @jScrBoxWrap.scrollTop() + @step * 7 then @max_xt - 15 * 4
        when y < @jScrBoxWrap.scrollTop() + @step * 8 then @max_xt - 15 * 4.5
        when y < @jScrBoxWrap.scrollTop() + @step * 9 then @max_xt - 15 * 4.8
        when y < @jScrBoxWrap.scrollTop() + @step * 10 then @max_xt - 15 * 4.5
        when y < @jScrBoxWrap.scrollTop() + @step * 11 then @max_xt - 15 * 4
        when y < @jScrBoxWrap.scrollTop() + @step * 12 then @max_xt - 15 * 3.6
        when y < @jScrBoxWrap.scrollTop() + @step * 13 then @max_xt - 15 * 3.4
        when y < @jScrBoxWrap.scrollTop() + @step * 14 then @max_xt - 15 * 2.7
        when y < @jScrBoxWrap.scrollTop() + @step * 15 then @max_xt - 15 * 2
        when y < @jScrBoxWrap.scrollTop() + @step * 16 then @max_xt - 15 * 1.2
        when y < @jScrBox.height() then @max_xt
        else @max_xt

      @jItemsWraps.eq(i).css('transform', "translateX(#{_t}px)")

  update2: () ->
    for y, i in @jtemParams
      _y = @jtemParams[i] - @jScrBoxWrap.scrollTop()
      _x = Math.cos(_y - @C.y1 - @o1.y) * (@o1.r - @C.x3)
      _t = 0

      @jItemsWraps.eq(i).find('div').html(Math.acos(_y))

  sectorBy3Dots: (x1, y1, x2, y2, x3, y3) ->
    ma = (y2 - y1) / (x2 - x1)
    mb = (y3 - y2) / (x3 - x2)

    x = ( ma*mb*(y1 - y3) + mb*(x1 + x2) - ma*(x2 + x3) ) / ( 2*(mb - ma) )
    y = -1/ma * (x - (x1 + x2) / 2) + (y1 + y2) / 2

    r = Math.pow((Math.pow(x - x1, 2) + Math.pow(y - y1, 2)), 0.5)

    sa = Math.atan((y - y1) / (x - x1))
    ea = Math.atan((y - y3) / (x - x3))

    #    console.log "x: #{x}, y: #{y}, r: #{r}, sa: #{sa}, ea: #{ea}"
    {x: x, y: y, r: r, sa: sa, ea: ea}

  drawSectorBar: () ->
    @ctx.beginPath()
    @ctx.arc(@o1.x, @o1.y, @o1.r, Math.PI + @o1.sa, Math.PI + @o1.ea)

    sa2 = Math.asin( Math.sin(@o1.sa) * @o1.r / (@o1.r + @dx) )
    ea2 = Math.asin( Math.sin(@o1.ea) * @o1.r / (@o1.r + @dx) )

    @ctx.arc(@o1.x, @o1.y, @o1.r + @dx, Math.PI + ea2, Math.PI + sa2, 1)
    @ctx.fillStyle = @barColor
    @ctx.strokeStyle =  @barColor
    @ctx.shadowBlur = 0
    @ctx.closePath()
    @ctx.fill()

  drawSectorScroller: (pW = 30, pT = 10) ->
    @ctx.lineWidth = 1
    @ctx.strokeStyle = @color

    p1 = Math.abs(@o1.ea - @o1.sa) / 100
    w1 = pW * p1
    k1 = (@o1.ea - w1 - @o1.sa) / 100
    sa1 = @o1.sa + k1 * pT
    ea1 = sa1 + w1

    sa2 = Math.asin( Math.sin(sa1) * @o1.r / (@o1.r + @dx) )
    ea2 = Math.asin( Math.sin(ea1) * @o1.r / (@o1.r + @dx) )

    @ctx.beginPath()
    @ctx.arc(@o1.x, @o1.y, @o1.r, Math.PI + sa1, Math.PI + ea1)
    @ctx.arc(@o1.x, @o1.y, @o1.r + @dx, Math.PI + ea2, Math.PI + sa2, 1)
    @ctx.fillStyle = @dragColor
    @ctx.shadowColor = @dragColor
    @ctx.shadowBlur = 10
    @ctx.closePath()
    @ctx.fill()

  draw: (pW = 10, pT = 0) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)

    @drawSectorBar()
    @drawSectorScroller(pW, pT)
    return