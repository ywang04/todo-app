/**
 * @Author: ywang04
 * @Date:   2018-01-11T15:33:29+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T21:42:54+11:00
 */

var fs = require('fs')
var dataFile = '../server/db/todo.json'

var loadTodosFromFile = function () {
  var content = fs.readFileSync(dataFile, 'utf-8')
  var todos = JSON.parse(content)
  return todos
}

var t = {
  data: loadTodosFromFile()
}

t.writeTodosToFile = function () {
  var data = JSON.stringify(this.data)
  fs.writeFile(dataFile, data, function (err) {
    if (err) {
      throw err
    } else {
      console.log('todo has been saved.')
    }
  })
}

t.all = function () {
  return this.data
}


t.add = function (todo) {
  var length = this.data.length
  if (length) {
    todo.id = this.data[this.data.length - 1].id + 1
  } else {
    todo.id = 1
  }
  this.data.push(todo)
  t.writeTodosToFile()
  return todo
}

t.delete = function (id) {
  var todos = this.data
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      todos.splice(i, 1)
      t.writeTodosToFile()
      return `todo ${id} has been deleted.`
    }
  }
  return `todo ${id} doesn't exist.`
}

t.update = function (id, task) {
  var todos = this.data
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      var todo = todos[i]
      todo.task = task
      t.writeTodosToFile()
      console.log(`todo ${id} has been updated.`)
      return todo
    }
  }
  return `todo ${id} does not exist.`
}

t.done = function (id) {
  var todos = this.data
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      var todo = todos[i]
      todo.status = true
      t.writeTodosToFile()
      return todo
    }
  }
}

t.undo = function (id) {
  var todos = this.data
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      var todo = todos[i]
      todo.status = false
      t.writeTodosToFile()
      return todo
    }
  }
}

module.exports = t