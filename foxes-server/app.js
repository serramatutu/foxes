var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();
global.app = app;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./middleware/serve-metadata'));

// setup routes
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).end();
});

module.exports = app;
