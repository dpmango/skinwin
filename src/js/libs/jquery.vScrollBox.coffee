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

  update: ->
    $(W).trigger 'resize'

  init: ->
    @jBox.each ->
      console.log 1
      jWrap = $(@).children '.v-scroll-box-wrap'
      jBar = $(@).children '.v-scroll-box-bar'
      jMarker = jBar.children 'div'
      scrollerHeight = jBar.height() * jWrap.height() / jWrap.get(0).scrollHeight
      jMarker.css
        height: "#{scrollerHeight}px"
        display: if scrollerHeight >= jBar.height() then 'none' else 'block'

      $(W).resize ->
        scrollerHeight = jBar.height() * jWrap.height() / jWrap.get(0).scrollHeight
        jMarker.css
          height: "#{scrollerHeight}px"
          display: if scrollerHeight >= jBar.height() then 'none' else 'block'

      jWrap.on 'scroll', ->
        sT = jWrap.scrollTop()
        pK = sT / ((jWrap.get(0).scrollHeight - jWrap.height()) / 100)
        jMarker.css 'transform', "translateY(#{(jBar.height() - scrollerHeight) / 100 * pK}px)"

    return