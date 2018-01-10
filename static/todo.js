/**
 * @Author: ywang04
 * @Date:   2018-01-11T09:04:37+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-11T09:19:01+11:00
 */

var Todo = function() {

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
    var method = 'GET'
    var url = '/todo/all'
    ajax(method, url, '', function(r) {
      var todos = JSON.parse(r.response)
      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        append(todo)
      }
    })
  }

  var add = function(todo) {
    var method = 'POST'
    var url = '/todo/add'
    var data = JSON.stringify(todo)
    ajax(method, url, data, function(r) {
      log("服务器的响应:", r.response)
    })
  }

  var delete = function(id) {
    var method = 'GET'
    var url = '/todo/delete/' + id
    ajax(method, url, '', function(r) {
      console.log("服务器的响应:", r.response)
    })
  }

  var update = function(id, task) {
    var method = 'POST'
    var url = '/todo/update/' + id
    var todo = {
      task: task
    }
    var data = JSON.stringify(todo)
    ajax(method, url, data, function(r) {
      console.log("服务器的响应:", r.response)
    })
  }

  return {
    load: load,
    add: add,
    delete: delete,
    update: update
  }

}()