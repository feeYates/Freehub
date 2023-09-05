// 导入koa-router
const Router = require('koa-router');

// 导入verifyLogin验证登录
const {
 verifyAuth
} = require('../middleware/auth.middleware');

//  导入lable.controller
const {
  create, 
  list
} = require('../controller/lable.controller.js');

// 创建lableRouter
const lableRouter = new Router({prefix: '/lable'});

// 创建一个post请求 创建标签：1.需要登录
lableRouter.post('/', verifyAuth, create);
// 创建一个get请求 获取标签 
lableRouter.get('/', list);

// 导出
module.exports = lableRouter;


