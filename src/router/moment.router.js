
// const Router = require('koa-router');




// // 创建momentRouter
// const momentRouter = new Router({prefix: '/moment'});

// momentRouter.post('/moment', create);

// // 导出
// module.exports = momentRouter;

// // 导koa-router
const Router = require('koa-router');

// 导入controller
const {
  create,
  detail,
  list,
  update,
  remove,
  addLables,
  fileInfo
} = require('../controller/moment.controller');

// 导入token权限认证
const {
  verifyAuth,
  verifyPermissiom
} = require('../middleware/auth.middleware');

// 导入lable.middle验证当前lable是否存在
const {
  verifyLableExists
} = require('../middleware/lable.middleware');

const momentRouter = new Router({prefix: '/moment'});

// 创建一个post请求 创建动态
momentRouter.post('/', verifyAuth, create);
// 创建一个get请求 查询多条动态
momentRouter.get('/', list);
// 创建一个get请求 查询某一条动态
momentRouter.get('/:momentId', detail);
// 创建一个get请求 返回展示图片
momentRouter.get('/images/:filename', fileInfo);


// 创建一个更新请求 更新某一条动态：1.用户是否登录 2.用户是否具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermissiom, update);
// 创建一个删除请求 删除某一条动态： 1. 用户是否登录 2. 用户是否具备权限
momentRouter.delete('/:momentId', verifyAuth, verifyPermissiom, remove);

// 创建一个post请求 给动态添加标签 1.用户是否登录 2.用户是否具备权限 3.当前标签是否存在
momentRouter.post('/:momentId/lables', verifyAuth, verifyPermissiom, verifyLableExists, addLables);

// 导出
module.exports = momentRouter;