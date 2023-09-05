// 引入koa
const Koa = require('koa');

// 导入koa-body
const {koaBody} = require('koa-body');

// 导入用户注册的路由
// const userRouter = require('../router/user.router');
// 导入用户登录的路由
// const authRouter = require('../router/auth.router');
// 导入封装好的动态路由
const useRoutes = require('../router');

// 导入处理错误的模块
const errorHandler = require('./error-handle');

// 实例化
const app = new Koa();

app.useRoutes = useRoutes;
app.use(koaBody({
  json: true
}))
app.useRoutes();
// useRoutes(app);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

// 监听错误
app.on("error", errorHandler);

// 导出app
module.exports = app;