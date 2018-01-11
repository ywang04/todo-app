/**
 * @Author: ywang04
 * @Date:   2018-01-03T10:00:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-11T15:32:30+11:00
 */
(function() {
  // bind function
  var bindEventAdd = function() {
    var input = e('#id-input-todo')
    var addButton = e('#id-button-add')
    bindEvent(addButton, 'click', function() {
      var task = input.value
      var data = {
        task: task
      }
      todoAjax.add(data)
      todoAjax.append(data)
    })
  }

  var bindEventDelete = function() {
    var todoContainer = e('#id-div-container')
    bindEvent(todoContainer, 'click', function(event) {
      var target = event.target
      if (target.classList.contains('todo-delete')) {
        var todoCell = target.closest('.todo-cell')
        var id = todoCell.dataset.id
        todoAjax.delete(id)
        todoCell.remove()
      }
    })
  }

  var bindEventUpdate = function() {
    var todoContainer = e('#id-div-container')
    bindEvent(todoContainer, 'click', function(event) {
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
        todoAjax.update(id, task)
      }
    })
  }

  var bindEvents = function() {
    bindEventAdd()
    bindEventDelete()
    bindEventUpdate()
  }

  todoAjax.load()
  bindEvents()

})()