const Koa = require('koa');
const app = new Koa();
const moddlewares = require('./middleware');
const router = require('./router');

app.proxy = true;

/**
 * @desc 加载中间件
 */
moddlewares(app);

/**
 * @desc 路由
 */
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;