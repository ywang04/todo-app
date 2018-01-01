var log = console.log.bind(console)

var e = function(selector) {
  return document.querySelector(selector);
}

var bindEvent = function(element, eventType, selector, callback) {
  if (callback === undefined) {
    callback = selector
    selector = null
  }
  element.addEventListener(eventType,function(event) {
    //use event delegation
    if (selector) {
      var target = event.target
      if (target.matches(selector)) {
        callback.call(target)
      }
    } else {
      callback(event)  //without event delegation
    }
  })
}


var ajax = function(method, path, data, responseCallback) {
  var r = new XMLHttpRequest()
  r.open(method, path, true)
  r.setRequestHeader('Content-Type', 'application/json')
  r.onreadystatechange = function() {
    if (r.readyState === 4) {
      responseCallback(r)
    }
  }
  r.send(data)
}
