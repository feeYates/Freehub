// 导入koa-router
const Router = require('koa-router');

// 导入user.controller
const {
  create,
  avatarInfo
} = require('../controller/user.controller');

// 导入user.middleware
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');

// 创建一个用户注册的路由
const userRouter = new Router({prefix: '/users'});

// 使用UserRouter发送一个post请求，这时候需要使用到koa-body这个库
// 注： 之前使用koa-bodyparser这个库获到的是{},现在改用koa-body
userRouter.post('/', verifyUser, handlePassword, create);

// 创建一个get请求 获取头像 
userRouter.get('/:userId/avatar', avatarInfo);

// 导出用户注册的路由
module.exports = userRouter;