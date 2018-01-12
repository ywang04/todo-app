/**
 * @Author: ywang04
 * @Date:   2017-12-18T09:11:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-12T21:15:49+11:00
 */


var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(express.static('static'))
app.use("/node_modules", express.static(__dirname + '/node_modules'))
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
  var r = todo.remove(id)
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

app.listen(3000)