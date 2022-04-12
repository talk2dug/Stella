var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
const joystick = require('joystick');
const { io } = require("socket.io-client");
// Init PS3 controller, 0 = /dev/input/js0
const ps3Controller = new joystick(0);
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
// On button press
const rover = io("http://192.168.196.10:3000");

rover.on("sensors", (data) => {
console.log(data)


});
ps3Controller.on('button', button => {
  console.log({ button });
  switch (button.number) {
    case 6:
      obj.lightButton = button.value;
      break;
      case 0:
        obj.breakButton = button.value;
        break;
    default:
      break;
  }
  rover.emit("joystick", obj);
  console.log( obj);


});
var obj ={
  ail: 1500,
  elev: 1500,
  yaw:1500,
  throttle:1500,
  thumbLR:1500,
  thumbUD:1500,
  lightButton:0,
  breakButton: 0

}
// On axis movement
ps3Controller.on('axis', axis => {

  switch (axis.number) {
    case 0:
      obj.ail = scale(axis.value, -32767, 32767, 1000, 2000).toFixed();
      break;
      case 1:
      obj.elev = scale(axis.value, -32767, 32767, 2000, 1000).toFixed();
        break;
        case 2:
      obj.yaw = scale(axis.value, -32767, 32767, 180, 0).toFixed()
      break;
      case 3:
      obj.throttle = scale(axis.value, -32767, 32767, 2000, 1000).toFixed()
      break;
      case 4:
      obj.thumbLR = scale(axis.value, -32767, 32767, 2000, 1000).toFixed()
      break;
      case 5:
      obj.thumbUD = scale(axis.value, -32767, 32767, 2000, 1000).toFixed()
      break;
    default:
      break;
  }

  rover.emit("joystick", obj);
  console.log( obj);
});
module.exports = app;
