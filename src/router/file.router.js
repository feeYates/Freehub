// 导入koa-router
const Router = require('koa-router');

const path = require('path');

// 验证登录
const {
  verifyAuth
} = require('../middleware/auth.middleware');

// 导入头像上传处理的中间件
const {
  handleUpLoadAvatar,
  handleUploadPicture,
  pictureReSize
} = require('../middleware/file.middleware');

// 导入保存头像信息处理的controller
const {
  saveAvatarInfo,
  saveFileInfo
} = require('../controller/file.controller');

// 创建fileRouter
const fileRouter = new Router({prefix: '/upload'});

// 创建一个post请求 上传头像：1.需要登录 2.处理上传图像 3.保存上传的图像
fileRouter.post('/avatar', verifyAuth, handleUpLoadAvatar, saveAvatarInfo);
// 创建一个post请求 上传动态配图： 1.需要登录 2.处理上传图像 3.拦截图像进行图像尺寸处理  4.保存上传图像信息
fileRouter.post('/picture', verifyAuth, handleUploadPicture, pictureReSize, saveFileInfo);

 

// 导出fileRouter
module.exports = fileRouter;