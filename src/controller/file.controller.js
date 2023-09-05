// 导入fileService
const fileService = require('../service/file.service');
// 导入userService 
const userService = require('../service/user.service');
// 导入config
const config = require('../app/config');

// 导入图片路径常量
const { AVATAR_PATH } = require('../constant/file-path');

// 保存图片处理saveAvatarInfo
const saveAvatarInfo = async(ctx, next) => {
  // 获取图片的信息filename mimetype size
  console.log(ctx.request.file)
  const { filename, mimetype, size } = ctx.request.file;
  // 用户id userId
  const { id } = ctx.user;
  // 将数据传给fileService进行处理
  const result = await fileService.createAvatar(filename, mimetype, size, id);

  // 将图片路径通过userId更新 传到userService进行处理 
  // http://localhost:8888/users/1/avatar
  const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
  await userService.updateAvatarUrlByUserId(avatarUrl, id);

  // 返回结果
  ctx.body = {
    status: 200,
    message: "上传头像成功"
  }
}

// 上传动态配图信息
const saveFileInfo = async(ctx, next) => {
  // 获取图片信息
  const files = ctx.request.files;
  // 获取用户id
  const { id } = ctx.user;
  // 要求前端传值 momentId
  const { momentId } = ctx.query;

  // 将所有信息保存到数据库中
  for(let file of files) {
    const {filename, mimetype, size} = file;
    // console.log(filename, mimetype, size, id, momentId)
    await fileService.createPicture(filename, mimetype, size, id, momentId);
  }
  
  // 返回结果
  ctx.body = {
    statusCode: 200,
    message: "上传动态配图成功"
  }




}

// 导出
module.exports = {
  saveAvatarInfo,
  saveFileInfo
}
