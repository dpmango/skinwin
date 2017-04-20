$ = jQuery
W = window
D = document

class W.VScrollBox
  constructor: (@selector) ->
    @jBox = $ @selector

  @instance: (selector) ->
    inst = new @ selector
    inst.init()
    inst

  init: ->
    @jBox.each ->
      jWrap = $ '.v-scroll-box-wrap', @
      jBar = $ '.v-scroll-box-bar', @
      jMarker = $ 'div', jBar
      scrollerHeight = jBar.height() * jWrap.height() / jWrap.get(0).scrollHeight
      jMarker.css 'height', "#{scrollerHeight}px"

      $(W).resize ->
        scrollerHeight = jBar.height() * jWrap.height() / jWrap.get(0).scrollHeight
        jMarker.css 'height', "#{scrollerHeight}px"

      jWrap.on 'scroll', ->
        sT = jWrap.scrollTop()
        pK = sT / ((jWrap.get(0).scrollHeight - jWrap.height()) / 100)
        jMarker.css 'transform', "translateY(#{(jBar.height() - scrollerHeight) / 100 * pK}px)"

    return