/**
 * @Author: ywang04
 * @Date:   2018-01-11T09:04:37+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-13T13:47:06+11:00
 */

var utils = require('./utils.js')

var appendHtml = function(element, html) {
  element.insertAdjacentHTML('beforeend', html)
}

var template = function(todo) {
  var id = todo.id
  var task = todo.task
  var t = `
    <div class="todo-cell" data-id=${id}>
      <button type="button" name="button" class="todo-done">Done</button>
      <button type="button" name="button" class="todo-delete">Delete</button>
      <button type="button" name="button" class="todo-update">Update</button>
      <span class="todo-content">${task}</span>
    </div>
    `
  return t
}

var append = function(todo) {
  var container = utils.e('#id-div-container')
  var t = template(todo)
  appendHtml(container, t)
}

// Send ajax request to load, add, delete, update todo
var load = function() {
  var request = {
    method: 'GET',
    url: '/api/todo/all',
    contentType: 'application/json',
    responseCallback: function(r) {
      var todos = JSON.parse(r.response)
      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        append(todo)
      }
    }
  }
  utils.ajax(request)
}

var add = function(todo) {
  var data = JSON.stringify(todo)
  var request = {
    method: 'POST',
    url: '/api/todo/add',
    contentType: 'application/json',
    data: data,
    responseCallback: function(r) {
      var todo = JSON.parse(r.response)
      append(todo)
    }
  }
  utils.ajax(request)
}

var remove = function(id) {
  var request = {
    method: 'GET',
    url: '/api/todo/delete/' + id,
    contentType: 'application/json',
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

var update = function(id, task) {
  var todo = {
    task: task
  }
  var data = JSON.stringify(todo);
  var request = {
    method: 'POST',
    url: '/api/todo/update/' + id,
    contentType: 'application/json',
    data: data,
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

module.exports = {
  load: load,
  add: add,
  delete: remove,
  update: update
}