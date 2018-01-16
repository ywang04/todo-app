/**
 * @Author: ywang04
 * @Date:   2018-01-03T10:00:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T09:49:56+11:00
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

var template = function(todo) {
  var id = todo.id
  var task = todo.task
  var status = todo.status
  var done = ''
  if (status) {
    done = 'todo-done'
  }
  return `
    <div class="todo-cell ${done}" data-id=${id}>
      <button type="button" name="button" class="todo-status">Done</button>
      <button type="button" name="button" class="todo-delete">Delete</button>
      <button type="button" name="button" class="todo-update">Update</button>
      <span class="todo-content">${task}</span>
    </div>
    `
}

var appendTodo = function(todo) {
  var todoContainer = e('#id-div-container')
  var t = template(todo)
  todoContainer.insertAdjacentHTML('beforeend', t)
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