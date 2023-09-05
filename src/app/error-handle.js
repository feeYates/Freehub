// 导入错误类型
const errorTypes = require('../constant/error-types');

const errorHandler = (error, ctx) => {
  let status, message;
  switch(error.message) {
    // 用户名或者密码不能为空
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //Bad Request
      message = '用户名或者密码不能为空';
      break;

    // 当前用户已经存在
    case errorTypes.USER_IS_ALREADY_EXISTS:
      status = 409; //conflict
      message = '当前用户已经存在';
      break;

    // 当前用户不存在
    case errorTypes.USER_DOSE_NOT_EXISTS:
      status = 400; // 参数错误
      message = '当前用户不存在';
      break;
    
    // 当前用户密码不正确
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = '当前用户密码不正确';
      break;

    // 当前token无效
    case errorTypes.UNAUTHORIZATION: 
      status = 401;
      message = '当前token无效'
      break;

    // 您不具备该项权限
    case errorTypes.NO_PERMISSION: 
      status = 401;
      message = '您不具备该权限'
      break;

    // 默认错误
    default:
      status = 404;
      message = 'NOT FOUND'
  }

  ctx.status = status; // 设置状态
  ctx.body = message;  // 设置body信息
}

// 导出
module.exports = errorHandler;