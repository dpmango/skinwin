$ = jQuery
W = window
D = document

class W.HScrollBox
  constructor: (scrollBoxSelector, @step = 0.5, @shrinkLastItems = false, @scrollToEnd = false) ->
    @jHSBs = $ "#{scrollBoxSelector}"
    @jWrap = $ '.h-scroll-box-wrap', @jHSBs
    @jInner = $ '.h-scroll-box-inner', @jHSBs
    @jItems = $ '.h-scroll-box-item', @jWrap
    @jBar = $ '.h-scroll-box-bar', @jHSBs
    @jNext = $ '.h-scroll-box-next', @jHSBs
    @jPrev = $ '.h-scroll-box-prev', @jHSBs
    @jScroller = $ 'div', @jBar
    @wrapWidth = @scrollerWidth = 0
    @jtemParams = []

  @instance: (scrollBoxSelector, step = 0.5, shrinkLastItems = false, scrollToEnd) ->
    inst = new @ scrollBoxSelector, step, shrinkLastItems, scrollToEnd
    inst.init()
    inst

  init: ->
    @wrapWidth = parseInt(@jWrap.css "paddingLeft") + parseInt(@jWrap.css "paddingRight")

    @jItems.each (i) =>
      @wrapWidth += @jItems.eq(i).outerWidth(true)
      @initItemParams(@jItems.eq(i), i) if @shrinkLastItems
    @jWrap.width(@wrapWidth)

    @update()

    $(W).resize =>
      @update @jWrap.position().left, @jScroller.position().left

    if @jNext.length
      @jNext.click =>
        wx = @jWrap.position().left + @jInner.width() * @step
        sx = @jScroller.position().left - @scrollerWidth * @step
        @update(wx, sx)
        return

    if @jPrev.length
      @jPrev.click =>
        wx = @jWrap.position().left - @jInner.width() * @step
        sx = @jScroller.position().left + @scrollerWidth * @step
        @update(wx, sx)
        return


    @jHSBs.on 'DOMMouseScroll mousewheel', (e) =>
      if e.originalEvent.wheelDelta > 0 or e.originalEvent.detail < 0
        wx = @jWrap.position().left + @jInner.width() * @step
        sx = @jScroller.position().left - @scrollerWidth * @step
        e.preventDefault() if !@endScrollLeft and @scrollerWidth > 0
      else
        wx = @jWrap.position().left - @jInner.width() * @step
        sx = @jScroller.position().left + @scrollerWidth * @step
        e.preventDefault() if !@endScrollRight and @scrollerWidth > 0
      @update(wx, sx)
      return

    if @scrollToEnd
      @update(-100000, 100000)

    setTimeout =>
      @jHSBs.addClass 'h-scroll-box-animated'
    , 500

    return

  initItemParams: (jItem, i) ->
    @jtemParams[i] =
      left: jItem.position().left
      width: jItem.outerWidth(true)

#  scrollToEnd: ->
#    wx = @jWrap.position().left - @jHSBs.width() * @step
#    sx = @jScroller.position().left + @scrollerWidth * @step

  updateItems: (wx) ->
    last_id = 10000
    for item, i in @jtemParams
      if i > last_id
        @jItems.eq(i).addClass 'is-last-item'
      else if item.left >= @jInner.width() - wx - item.width - 10
        last_id = i
        @jItems.eq(i).addClass 'is-last-item'
      else
        @jItems.eq(i).removeClass 'is-last-item'


  update: (wx = 0, sx = 0) ->
    if @jInner.outerWidth() - @wrapWidth >= 0
      wx = sx = 0
      @jWrap.width 'auto'
      @jScroller.width 0
    else
      @jWrap.width @wrapWidth

      @scrollerWidth = @jBar.width() * @jInner.width() / @wrapWidth
      @jScroller.width @scrollerWidth

      wx = switch
        when wx > 0 then 0
        when wx < @jInner.width() - @wrapWidth then @jInner.width() - @wrapWidth
        else wx

      sx = switch
        when sx < 0 then 0
        when sx > @jBar.width() - @scrollerWidth then @jBar.width() - @scrollerWidth
        else sx

    @endScrollLeft = if sx is 0 then 1 else 0
    @endScrollRight = if sx is @jBar.width() - @scrollerWidth then 1 else 0

    @jWrap.css 'transform', "translateX(#{wx}px)"
    @jScroller.css 'transform', "translateX(#{sx}px)"
    @updateItems(wx) if @shrinkLastItems