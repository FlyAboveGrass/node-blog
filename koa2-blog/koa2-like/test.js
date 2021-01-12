const Koa = require('./koa2-like');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
    console.log('1 start -----')
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
    console.log('1 end ----')
    console.log()
});

// x-response-time
app.use(async (ctx, next) => {
    console.log('2 start +++');
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx['X-Response-Time'] = `${ms}ms`;
    console.log('2 end +++')
});

// response
app.use(async ctx => {
    console.log('请求主体 ~~~');
    ctx.res.end('This is like koa2'); 
});

app.listen(8101, () => {
    console.log('test server is run in http://127.0.0.1:8101');
});