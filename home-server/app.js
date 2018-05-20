var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exec = require('child_process').exec;

var indexRouter = require('./routes/index');
var lightRouter = require('./routes/light');
var desktopRouter = require('./routes/desktop');

var app = express();

// 毎日AM3:00にRaspberry Piを再起動
var CronJob = require('cron').CronJob;
new CronJob('00 00 03 * * *', function() {
    exec("sudo reboot",
	 function(err, stdout, stderr) {
	     console.log('Reboot!');
	 });
}, null, true, 'Asia/Tokyo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/light', lightRouter);
app.use('/desktop', desktopRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// dummy port number
var server = app.listen(1227, function () {
    console.log('Listening on port ' + server.address().port + '!');
});
