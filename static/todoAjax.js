/**
 * @Author: ywang04
 * @Date:   2018-01-11T09:04:37+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-11T15:31:26+11:00
 */

var todoAjax = function() {

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
    var container = e('#id-div-container')
    var t = template(todo)
    appendHtml(container, t)
  }

  // Send ajax request to load, add, delete, update todo
  var load = function() {
    var request = {
      method: 'GET',
      url: '/todo/all',
      contentType: 'application/json',
      responseCallback: function(r) {
        var todos = JSON.parse(r.response)
        for (var i = 0; i < todos.length; i++) {
          var todo = todos[i]
          append(todo)
        }
      }
    }
    ajax(request)
  }

  var add = function(todo) {
    var data = JSON.stringify(todo)
    var request = {
      method: 'POST',
      url: '/todo/add',
      contentType: 'application/json',
      data: data,
      responseCallback: function(r) {
        log("server response:", r.response)
      }
    }
    ajax(request)
  }

  var remove = function(id) {
    var request = {
      method: 'GET',
      url: '/todo/delete/' + id,
      contentType: 'application/json',
      responseCallback: function(r) {
        log("server response:", r.response)
      }
    }
    ajax(request)
  }

  var update = function(id, task) {
    var todo = {
      task: task
    }
    var data = JSON.stringify(todo);
    var request = {
      method: 'POST',
      url: '/todo/update/' + id,
      contentType: 'application/json',
      data: data,
      responseCallback: function(r) {
        log("server response:", r.response)
      }
    }
    ajax(request)
  }

  return {
    load: load,
    append: append,
    add: add,
    delete: remove,
    update: update
  }

}()