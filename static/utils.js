/**
 * @Author: ywang04
 * @Date:   2018-01-03T10:00:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-11T10:18:15+11:00
 */

var log = console.log.bind(console)

var e = function(selector) {
  return document.querySelector(selector);
}

var bindEvent = function(element, eventType, callback) {
  element.addEventListener(eventType, callback)
}

var ajax = function(request) {
  var r = new XMLHttpRequest()
  r.open(request.method, request.url, true)
  if (request.contentType !== undefined) {
    r.setRequestHeader('Content-Type', request.contentType)
  }
  r.onreadystatechange = function() {
    if (r.readyState === 4) {
      request.responseCallback(r)
    }
  }
  if (request.method === "GET") {
    r.send()
  } else {
    r.send(request.data)
  }
}