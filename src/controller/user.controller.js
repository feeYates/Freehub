// 导入fs模块
const fs = require('fs');

// 导入user.service
const userService = require('../service/user.service');
// 导入file.service
const fileService = require('../service/file.service');

// 导入头像路径的常量
const { AVATAR_PATH } = require('../constant/file-path');

class UserController {
  async create(ctx, next) {
    //  获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 获取当前的用户id userId
    const { userId } = ctx.params;
    // 将id传给fileService进行处理
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // // 返回结果
    
    // 设置响应体类型
    ctx.response.set('content-type', avatarInfo.mimetype);
    // 读取文件
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);

  }
}

module.exports = new UserController();