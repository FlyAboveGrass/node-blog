var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { SESSION_SECRET } = require('./conf/key')
var expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)
const redisClient = require('./db/redis')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var userRouter = require('./routes/user')
var blogRouter = require('./routes/blog')

var app = express();

// cores跨域
const cors = require('cors')
app.use(cors());
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// session 保存
app.use(cookieParser());
const sessionStore = new RedisStore({
  client: redisClient
})
// 从cookie过来（secret的值一定要和cookieParser的一致），拿到cookie的值然后去找session，session存在则放到req.session, 如果存在store则通过store存起来
app.use(expressSession({
  secret: SESSION_SECRET,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

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
