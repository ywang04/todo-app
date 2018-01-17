/**
 * @Author: ywang04
 * @Date:   2017-12-18T09:11:51+11:00
 * @Last modified by:   ywang04
 * @Last modified time: 2018-01-17T16:19:49+11:00
 */


var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index')
var todoRouter = require('./routes/todo')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(bodyParser.json())
app.use('/', indexRouter)
app.use('/api/todo/', todoRouter)

app.listen(3000, function() {
  console.log("listening on port 3000");
})