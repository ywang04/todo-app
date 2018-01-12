/**
 * @Author: ywang04
 * @Date:   2018-01-11T15:33:29+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-12T10:00:25+11:00
 */

var fs = require('fs')
var dataFile = './db/todo.json'

var loadTodosFromFile = function() {
  var content = fs.readFileSync(dataFile, 'utf-8')
  var todos = JSON.parse(content)
  return todos
}

var t = {
  data: loadTodosFromFile()
}

t.writeTodosToFile = function() {
  var data = JSON.stringify(this.data)
  fs.writeFile(dataFile, data, function(err) {
    if (err) {
      throw err
    } else {
      console.log("todo has been saved.")
    }
  })
}

t.all = function() {
  return this.data
}


t.add = function(todo) {
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

t.remove = function(id) {
  for (var i = 0; i < this.data.length; i++) {
    if (id === this.data[i].id) {
      this.data.splice(i, 1)
      t.writeTodosToFile()
      return `todo ${id} has been deleted.`
    }
  }
  return `todo ${id} doesn't exist.`
}

t.update = function(id, task) {
  for (var i = 0; i < this.data.length; i++) {
    if (id === this.data[i].id) {
      this.data[i].task = task
      t.writeTodosToFile()
      return `todo ${id} has been updated.`
    }
  }
  return `todo ${id} does not exist.`
}


module.exports = t