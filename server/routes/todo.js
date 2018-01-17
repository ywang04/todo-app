/**
 * @Author: ywang04
 * @Date:   2018-01-17T16:24:13+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T16:24:30+11:00
 */


app.get('/api/todo/all', function(request, response) {
  var data = todo.all()
  response.send(data)
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