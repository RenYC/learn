(function(global, factory) {
  if(typeof define === 'function' && define.amd)
    define(function() { return factory(flobal) })
  else
    factory(global)
}(this, function(window) {
  var Zepto = (function(){
    var $, zepto = {}

    function Z(dom, selector) {
      var i, len = dom ? dom.length : 0
      for(i = 0; i<len; i++) this[i] = dom[i]
      this.length = len
      this.selector = selector || ''
    }

    zepto.Z = function (dom, selector) {
      return new Z(dom, selector)
    }

    zepto.init = function (selector, context) {
      var dom
      return zepto.Z(dom, selector)
    }

    $ = function (selector, context) {
      return zepto.init(selector, context)
    }

    $.zepto = zepto

    console.log(111)
    return $
  })()

  window.Zepto = Zepto
  window.$ === undefined && (window.$ = Zepto)

  console.log($)
}))