/**
 * @Author: ywang04
 * @Date:   2017-12-18T09:11:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-16T21:25:44+11:00
 */


var express = require('express')
var app = express()
var todoRouter = express.Router()
var bodyParser = require('body-parser')


app.use(express.static('static'))
app.use(bodyParser.json())

var todo = require('./todo.js')

var sendHtml = function(path, response) {
  var fs = require('fs')
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      throw err
    } else {
      response.send(data)
    }
  })
}

app.get('/', function(request, response) {
  var path = "index.html"
  sendHtml(path, response)
})

app.post('/api/todo/add', function(request, response) {
  var data = request.body
  var r = todo.add(data)
  response.send(r)
})

app.get('/api/todo/delete/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.delete(id)
  response.send(r)
})

app.post('/api/todo/update/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var data = request.body
  var task = data.task
  var r = todo.update(id, task)
  response.send(r)
})

app.get('/api/todo/all', function(request, response) {
  var data = todo.all()
  response.send(data)
})

app.get('/api/todo/done/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.done(id)
  response.send(r)
})

app.get('/api/todo/undo/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.undo(id)
  response.send(r)
})

app.listen(3000)