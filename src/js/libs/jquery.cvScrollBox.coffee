$ = jQuery
W = window
D = document

class W.cvScrollBox
  constructor: (scrollBoxSelector, @color = "#ffffff") ->
    @jScrBox = $ scrollBoxSelector
    @jScrBoxWrap = $ ".rscroll-box-wrap", @jScrBox
    @jItems = $ ".rscroll-box-item", @jScrBox
    @jItemsWraps = $ ".rscroll-box-item-wrap", @jScrBox

    $(".scrl-canvas", @jScrBox).attr('id', "#{scrollBoxSelector}_canvas")
    @canvas = D.getElementById("#{scrollBoxSelector}_canvas")

    @ctx = @canvas.getContext('2d')
    @o1 = {x: 380.1021, y: 205.6397, r: 367.1046, sa: -0.1956, ea: 0.5945}
    @scrollerHeight = 0
    @step = 25
    @max_xt = 70
    @jtemParams = []

  @instance: (scrollBoxSelector, color = "#ffffff") ->
    inst = new @ scrollBoxSelector, color
    inst.init()
    inst

  init: ->
    @jScrBoxWrap.scrollTop(0)

    @jItems.each (i) =>
      @initItemParams(@jItems.eq(i), i)

    @update()
#    @draw(@scrollerHeight, 0)

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
        when y < @jScrBoxWrap.scrollTop() + @step * 10 then @max_xt - 15 * 4.3
        when y < @jScrBoxWrap.scrollTop() + @step * 11 then @max_xt - 15 * 3.9
        when y < @jScrBoxWrap.scrollTop() + @step * 12 then @max_xt - 15 * 3.2
        when y < @jScrBoxWrap.scrollTop() + @step * 13 then @max_xt - 15 * 2.8
        when y < @jScrBox.height() then @max_xt
        else @max_xt

      @jItemsWraps.eq(i).css('transform', "translateX(#{_t}px)")


  drawSectorBar: () ->
    @ctx.beginPath()
    @ctx.arc(@o1.x, @o1.y, @o1.r, Math.PI + @o1.sa, Math.PI + @o1.ea)
    @ctx.arc(@o1.x + 7, @o1.y, @o1.r, Math.PI + @o1.ea, Math.PI + @o1.sa, 1)
    @ctx.strokeStyle = "#18140a"
    @ctx.fillStyle = "#18140a"
    @ctx.lineWidth = 1
    @ctx.shadowColor = "#18140a"
    @ctx.shadowBlur = 1
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

    @ctx.beginPath()
    @ctx.arc(@o1.x, @o1.y, @o1.r, Math.PI + sa1, Math.PI + ea1)
    @ctx.arc(@o1.x + 7, @o1.y, @o1.r, Math.PI + ea1, Math.PI + sa1, 1)
    @ctx.fillStyle = @color
    @ctx.shadowColor = @color
    @ctx.shadowBlur = 10
    @ctx.closePath()
    @ctx.fill()
    @ctx.stroke()

  draw: (pW = 10, pT = 0) ->
    @ctx.clearRect(0,0, @canvas.width, @canvas.height)

    @drawSectorBar()
    @drawSectorScroller(pW, pT)
    return
