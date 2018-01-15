/**
 * @Author: ywang04
 * @Date:   2018-01-11T09:04:37+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-15T22:20:33+11:00
 */

var utils = require('../util/utils.js')

var add = function(todo) {
  var data = JSON.stringify(todo)
  var request = {
    method: 'POST',
    url: '/api/todo/add',
    contentType: 'application/json',
    data: data,
    responseCallback: function(r) {
      var todo = JSON.parse(r.response)
      append(todo)
    }
  }
  utils.ajax(request)
}

var remove = function(id) {
  var request = {
    method: 'GET',
    url: '/api/todo/delete/' + id,
    contentType: 'application/json',
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

var update = function(id, task) {
  var todo = {
    task: task
  }
  var data = JSON.stringify(todo);
  var request = {
    method: 'POST',
    url: '/api/todo/update/' + id,
    contentType: 'application/json',
    data: data,
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

var done = function(id) {
  var request = {
    method: 'GET',
    url: '/api/todo/done/' + id,
    contentType: 'application/json',
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

var undo = function(id) {
  var request = {
    method: 'GET',
    url: '/api/todo/undo/' + id,
    contentType: 'application/json',
    responseCallback: function(r) {
      console.log("server response:", r.response)
    }
  }
  utils.ajax(request)
}

module.exports = {
  add: add,
  delete: remove,
  update: update,
  done: done,
  undo: undo
}