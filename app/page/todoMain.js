/**
 * @Author: ywang04
 * @Date:   2018-01-03T10:00:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-15T22:22:11+11:00
 */

var utils = require('../util/utils.js')
// var todo = require('./todoAjax.js')

var init = function() {

}

var loadTodos = function() {

}

var renderTodos = function() {

}

// bind function
var bindEventAdd = function() {
  var input = utils.e('#id-input-todo')
  var addButton = utils.e('#id-button-add')
  utils.bindEvent(addButton, 'click', function() {
    var task = input.value
    var data = {
      task: task,
      status: false
    }
    todo.add(data)
    input.value = ""
  })
}

var bindEventDelete = function() {
  var todoContainer = utils.e('#id-div-container')
  utils.bindEvent(todoContainer, 'click', function(event) {
    var target = event.target
    if (target.classList.contains('todo-delete')) {
      var todoCell = target.closest('.todo-cell')
      var id = todoCell.dataset.id
      todo.delete(id)
      todoCell.remove()
    }
  })
}

var bindEventUpdate = function() {
  var todoContainer = utils.e('#id-div-container')
  utils.bindEvent(todoContainer, 'click', function(event) {
    var target = event.target
    var todoCell = target.closest('.todo-cell')
    var id = todoCell.dataset.id
    if (target.innerHTML === "Update") {
      var todoSpan = todoCell.querySelector('.todo-content')
      var task = todoSpan.innerHTML
      var t = `
      <input type="text" class="todo-input" value=${task}>
      `
      todoSpan.insertAdjacentHTML('beforebegin', t)
      todoSpan.remove()
      target.innerHTML = "Save"
    } else if (target.innerHTML === "Save") {
      var todoInput = todoCell.querySelector('.todo-input')
      var task = todoInput.value
      var t = `
        <span class="todo-content">${task}</span>
        `
      todoInput.insertAdjacentHTML('beforebegin', t)
      todoInput.remove()
      target.innerHTML = "Update"
      todo.update(id, task)
    }
  })
}

var bindEventStatus = function() {
  var todoContainer = utils.e('#id-div-container')
  utils.bindEvent(todoContainer, 'click', function(event) {
    var target = event.target
    var todoCell = target.closest('.todo-cell')
    var id = todoCell.dataset.id
    if (target.classList.contains('todo-status')) {
      if (todoCell.classList.contains('todo-done')) {
        todoCell.classList.remove('todo-done')
        todo.undo(id)
      } else {
        todoCell.classList.add('todo-done')
        todo.done(id)
      }
    }
  })
}

var bindEvents = function() {
  bindEventAdd()
  bindEventDelete()
  bindEventUpdate()
  bindEventStatus()
}

var __main = function() {
  init()
  bindEvents()
}

__main()