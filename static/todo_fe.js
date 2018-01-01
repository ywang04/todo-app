/*
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

ajax('GET', '/todo/all', '', function(r) {
    console.log(r.response)
    console.log(typeof r.response)
})

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

var todoId = '2'
var url = '/todo/delete/' + todoId

ajax('GET', url, '', function(r) {
    alert('服务器响应:' + r.response)

})

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

var todoId = '3'
var url = '/todo/update/' + todoId
var data = {
    task: 'great'
}

data = JSON.stringify(data)

ajax('POST', url, data, function(r) {
    alert('服务器响应:' + r.response)

})

*/

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

var insertTodo = function(todo) {
  var container = e('#id-div-container')
  var t = template(todo)
  appendHtml(container, t)
}

/*
 ajax函数的封装 (增, 删, 改, 查)
*/
var loadTodos = function() {
  var method = 'GET'
  var path = '/todo/all'
  ajax(method, path, '', function(r) {
    var todos = JSON.parse(r.response)
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i]
      insertTodo(todo)
    }
  })
}

var addTodo = function(todo) {
  var method = 'POST'
  var path = '/todo/add'
  var data = JSON.stringify(todo)
  ajax(method, path, data, function(r) {
    log("服务器的响应:", r.response)
  })
}

var deleteTodo = function(id) {
  var method = 'GET'
  var path = '/todo/delete/' + id
  ajax(method, path, '', function(r) {
    console.log("服务器的响应:", r.response)
  })
}

var updateTodo = function(id, task) {
  var method = 'POST'
  var path = '/todo/update/' + id
  var todo = {
    task: task
  }
  var data = JSON.stringify(todo)
  ajax(method, path, data, function(r) {
    console.log("服务器的响应:", r.response)
  })
}


// return the index of the element
// var indexOfElement = function(todo) {
//   var elements = document.querySelectorAll('.todo-cell')
//   for (var i = 0; i < elements.length; i++) {
//     var element = elements[i]
//     if (element.lastElementChild.innerHTML === todo) {
//       return i + 1
//     }
//   }
// }

// var addCss = function() {
//   var style = `
//   <style>
//
//
//
//   </style>
//   `
//   var head = e('head')
//   appendHtml(head, style)
// }

// bind function
var bindEventAdd = function() {
  var input = e('#id-input-todo')
  var addButton = e('#id-button-add')
  bindEvent(addButton, 'click', function() {
    var task = input.value
    var todo = {
      task: task
    }
    addTodo(todo)
    insertTodo(todo)
  })
}

var bindEventDelete = function() {
  var todoContainer = e('#id-div-container')
  bindEvent(todoContainer, 'click', function(event) {
    var target = event.target
    if (target.classList.contains('todo-delete')) {
      var todoCell = target.closest('.todo-cell')
      var id = todoCell.dataset.id
      deleteTodo(id)
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
        updateTodo(id, task)
    }
  })
}

var bindEvents = function() {
  bindEventAdd()
  bindEventDelete()
  bindEventUpdate()
}

var __main = function() {
  loadTodos()
  // addClass()
  bindEvents()

}

__main()
