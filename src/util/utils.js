/**
 * @Author: ywang04
 * @Date:   2018-01-03T10:00:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T09:07:08+11:00
 */

var e = function(selector) {
  return document.querySelector(selector);
}

var bindEvent = function(element, eventType, callback) {
  element.addEventListener(eventType, callback)
}

var ajax = function(request) {
  var xhr = new XMLHttpRequest()
  xhr.open(request.method, request.url, true)
  if (request.contentType !== undefined) {
    xhr.setRequestHeader('Content-Type', request.contentType)
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      request.responseCallback(xhr)
    }
  }
  if (request.method === "GET") {
    xhr.send()
  } else {
    xhr.send(request.data)
  }
}

var toggleClass = function(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

module.exports = {
  e: e,
  bindEvent: bindEvent,
  toggleClass: toggleClass,
  ajax: ajax
}