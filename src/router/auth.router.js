// 导入koa-router
const Router = require('koa-router');

// 创建authRouter
const authRouter = new Router();

// 导入auth.controller
const {
  login,
  success
} = require('../controller/auth.controller');

// 导入拦截验证用户的中间件verifyLogin
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

// 创建一个登录请求
authRouter.post('/login',verifyLogin, login);
// 创建一个测试token是否生效的请求
authRouter.get('/test', verifyAuth, success);

module.exports = authRouter;