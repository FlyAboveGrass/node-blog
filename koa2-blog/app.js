const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis')

const user = require('./routes/user')
const blog = require('./routes/blog')

const { REDIS_CONF } = require('./conf/enviroment')

// error handler
onerror(app)

// cores跨域
const cors = require('koa2-cors')
app.use(cors({
  origin: function (ctx) {
      // 可以根据ctx内容限制允许跨域的请求
      return 'http://127.0.0.1:8080';
  },
  maxAge: 24 * 60 * 60 * 1000,
  methods:['GET','POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}))

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", true);
  // 2、一定要设置准确的协议。域名和端口，否则跨域失败
  ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  ctx.set('Access-Control-Allow-Headers', "*");
  ctx.set("Access-Control-Allow-Methods", "*");
  await next();
});

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// session处理要写在路由处理之前
app.keys = ['yangjiajian']
app.use(session({
  // cookie配置
  cookie: {
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  },
  // redis存储器
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
