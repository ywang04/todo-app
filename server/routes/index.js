/**
 * @Author: ywang04
 * @Date:   2018-01-17T15:30:45+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T16:24:37+11:00
 */

var todo = require('./models/todo.js')


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
  var path = "./server/views/index.html"
  sendHtml(path, response)
})