const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);
// 语法糖
// const http = require('http');
// http.createServer(app.callback()).listen(3000);

// 绑定 https 或多端口
// const https = require('https');
// https.createServer(app.callback()).listen(3001);
