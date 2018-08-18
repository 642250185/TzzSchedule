require('./schema');
require('./schedule');
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const router = koaRouter();
const {getHistory} = require('./auctionService');

router.get('/history', async (ctx, next) => {
    const {day} = ctx.request.query;
    ctx.body = await getHistory(day);
    await next();
});

app.use(koaBody());

// response
app.use(router.routes());
app.use(router.allowedMethods());

const http = app.listen(4003);
console.info('==> Server now is listening on port 4003');