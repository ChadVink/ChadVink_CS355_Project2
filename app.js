var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var skateCompany = require('./routes/skateCompany_routes');
var skater = require('./routes/skater_routes');
var sponcer = require('./routes/sponcer_routes');
var video = require('./routes/video_routes');
var account = require('./routes/skaterBaseUser_routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'project2'}));


app.use('/', routes);
app.use('/users', users);
app.use(function(req, res, next) {
  if(req.session.account == undefined) { //check if user is authenticated yet
    res.redirect('/login'); // they aren't so ask them to login
  }
  else {
    next(); //else proceed
  }
});

app.use('/skateCompany', skateCompany);
app.use('/skater', skater);
app.use('/sponcer', sponcer);
app.use('/video', video);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
