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
      jBox = $ @
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

      jMarker.on "mousedown.v-scroll", (e) =>
        my = e.pageY - jMarker.offset().top
        $(D).on('mousemove.v-scroll', (e) =>
          top = e.pageY - jBar.offset().top - my
          pK = top / ((jBar.outerHeight() - scrollerHeight) / 100)
          jWrap.scrollTop (jWrap.get(0).scrollHeight - jWrap.height()) / 100 * pK
          return
        ).on 'mouseup.v-scroll', ->
          $(D).off '.v-scroll'
          return
        return

      jBar.click (e) ->
        top = e.pageY - jBar.offset().top
        top = switch
          when top < scrollerHeight / 2 then 0
          when top > jBar.outerHeight() - scrollerHeight / 2 then jBar.outerHeight() - scrollerHeight / 2
          else top - scrollerHeight / 2

        pK = top / ((jBar.outerHeight() - scrollerHeight) / 100)
        jWrap.scrollTop (jWrap.get(0).scrollHeight - jWrap.height()) / 100 * pK

    return