//docker da env sıkıntı olmasın diye production da dotenv kullanılmasın diye
if (process.env.NODE_ENV != "production ")
  require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//video  dk : 3:09 alt iki satur silindi
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

//environments değişkenleri yazdıralım
// console.log("ENV",process.env);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log("ben app.js te tanımlanan bir middleware im");
  next();
  
});

//video 8 alttaki gibi kullanmak yerine dk 13 itibarı ile 
//router tanimlamalari http://localhost:3000   /users
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/', require('./routes/index')); //http://localhost:3000
// app.use('/users', require('./routes/users'));  //http://localhost:3000/users
// video 8 dk 8
// app.use('/auditlogs', require('./routes/auditlogs'))  
// app.use('/categories', require('./routes/categories'))  
app.use('/api', require('./routes/index'))


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
