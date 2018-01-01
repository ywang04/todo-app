/*
1; 拆分需求要细致，以 5-10 分钟能完成为拆分粒度 刚开始就从功能开始拆分开始写需求的时候不可能完全想明白 做到具体某个需求的时候再补子需求
2; 按照浏览器或者ajax发送请求的方式先写出后端api
3; 后端api先考虑内存中保存数据
4; 写好所有逻辑后 再考虑保存到文件中
5; 有问题的需求先跳过，最后不做也是行的
6; 边实现需求边测试，不要到最后一锅粥
7; 然后再写前端逻辑
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
