// 导入错误类型
const errorTypes = require('../constant/error-types');
// 导入service
const service = require('../service/user.service');
// 导入封装的md5方法
const md5password = require('../utils/password-handle');

// 用户信息的验证
const verifyUser = async(ctx, next) => {
  // 获取用户名和密码
  const {name, password} = ctx.request.body

  // 判断用户名或者密码不能为空
  if(!name || !password ) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户是否存在
  const result = await service.getUserByNames(name);
  if(result.length) {
    const error = new Error(errorTypes.USER_IS_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  
  // 执行下一步
  await next()
}

// 用户密码的加密操作
const handlePassword = async(ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  
  //  执行下一步
  await next();
}

// 导出
module.exports = {
  verifyUser,
  handlePassword
};