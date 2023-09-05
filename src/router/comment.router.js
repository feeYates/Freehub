// 导入路由koa-router
const Router = require('koa-router');

// 导入鉴定登录状态的中间件
const {
  verifyAuth, 
  verifyPermissiom
} = require('../middleware/auth.middleware');

// 导入comment.controller模块
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller');

// 创建commentRouter路由
const commentRouter = new Router({prefix: '/comment'});

//发布评论接口 创建一个post请求：1.需要登录 
commentRouter.post('/', verifyAuth, create);
// 回复评论接口 创建一个psot请求： 1.需要登录
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论 创建patch请求：1.需要登录 2.需要验证权限 
commentRouter.patch('/:commentId', verifyAuth, verifyPermissiom, update);
// commentRouter.patch('/:commentId', verifyAuth, verifyPermissiom("comment"), update);
// 删除评论 创建delete请求：1. 需要登录 2.需要验证权限
commentRouter.delete('/:commentId', verifyAuth, verifyPermissiom, remove);

// 获取评论接口
commentRouter.get('/', list);





module.exports = commentRouter;