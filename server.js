/**
 * @Author: ywang04
 * @Date:   2017-12-18T09:11:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-03T09:52:53+11:00
 */


var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(express.static('static'))
app.use(bodyParser.json())

var fs = require('fs')
var dataFile = 'todo.json'

var todos = []

var todoAdd = function(todo) {
  var length = todos.length
  if (length) {
    todo.id = todos[todos.length - 1].id + 1
  } else {
    todo.id = 1
  }
  todos.push(todo)
  writeTodosToFile()
  return todo
}

var todoDelete = function(id) {
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      todos.splice(i, 1)
      writeTodosToFile()
      return `todo ${id} has been deleted.`
    }
  }
  return `todo ${id} doesn't exist.`
}

var todoUpdate = function(id, task) {
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      todos[i].task = task
      writeTodosToFile()
      return `todo ${id} has been updated.`
    }
  }
  return `todo ${id} does not exist.`
}

var sendHtml = function(path, response) {
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      throw err
    } else {
      response.send(data)
    }
  })
}

var writeTodosToFile = function() {
  var data = JSON.stringify(todos)
  fs.writeFile(dataFile, data, function(err) {
    if (err) {
      throw err
    } else {
      console.log("todo has been saved.")
    }
  } )
}

var loadTodosToFile = function(callback) {
  fs.readFile(dataFile, function(err, data) {
    if (err) {
      callback()
    } else {
      todos = JSON.parse(data)
      callback()
    }
  })
}

app.get('/', function(request, response) {
  var path = "index.html"
  sendHtml(path, response)
})

app.get('/todo/all', function(request, response) {
  loadTodosToFile(function() {
    response.send(todos)
  })
})

app.post('/todo/add', function(request, response) {
  var todo = request.body
  var r = todoAdd(todo)
  response.send(r)
})

app.get('/todo/delete/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todoDelete(id)
  response.send(r)
})

app.post('/todo/update/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var data = request.body
  var task = data.task
  var r = todoUpdate(id, task)
  response.send(r)
})

app.listen(3000)
