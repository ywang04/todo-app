/**
 * @Author: ywang04
 * @Date:   2018-01-17T16:24:13+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T17:57:50+11:00
 */
var express = require('express')
var router = express.Router()
var todo = require('../models/todo')

router.get('/all', function(request, response) {
  var data = todo.all()
  response.send(data)
})

router.post('/add', function(request, response) {
  var data = request.body
  var r = todo.add(data)
  response.send(r)
})

router.get('/delete/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.delete(id)
  response.send(r)
})

router.post('/update/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var data = request.body
  var task = data.task
  var r = todo.update(id, task)
  response.send(r)
})

router.get('/done/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.done(id)
  response.send(r)
})

router.get('/undo/:id', function(request, response) {
  var id = parseInt(request.params.id)
  var r = todo.undo(id)
  response.send(r)
})

module.exports = router