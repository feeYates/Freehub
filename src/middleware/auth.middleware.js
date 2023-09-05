// 导入jwt第三方库
const jwt = require('jsonwebtoken');


// 导入错误的类型的常量
const errorTypes = require('../constant/error-types');
// 导入userService
const userService = require('../service/user.service');
// 导入authService
const authService = require('../service/auth.service');
// 导入封装好的md5加密工具
const md5password = require('../utils/password-handle');
// 导入公钥
const { PUBLIC_KEY } = require('../app/config');

// 验证用户登录操作的中间件
const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const {name, password} = ctx.request.body;

  // 判断用户名或者密码不能为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户是否已经存在
  const result = await userService.getUserByNames(name);
  const user = result[0];
  if(!user) {
    const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户的密码是否正确（加密）
  if(user.password !== md5password(password)) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  }

  // 将user挂在到ctx.user上面
  ctx.user = user

  // 下一步
  await next()
}

// 验证当前token是否生效的中间件
const verifyAuth = async(ctx, next) => {
  console.log('验证用户登录授权')
  // 获取token
  const authorization = ctx.headers.authorization;
  // 如果当前没有获取授权，ctx.headers就没有authorization，这里应该给出相关的报错信息
  if(!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');

  // 验证toen 验证成功下一步 否则抛出错误
  try {
    // 验证token
  const result = jwt.verify(token, PUBLIC_KEY, {
    algorithms: ["RS256"]
  });

  // 将result挂载到ctx.user
  ctx.user = result;
  // 下一步
  await next();
  }catch(err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}
  
  /**
   * 
   * 1. 很多的内容都需要验证权限：修改|删除动态，修改|删除评论动态
   * 2. 接口类型： 业务接口系统 | 后台管理系统
   *   一对一： user -> role
   *   多对多： role -> menu (删除动态 | 修改动态)
   */
  // 验证当前用户是否有权限对动态进行更行
  // const verifyPermissiom = async(ctx, next) => {
  //   // 获取当前用户id
  //   const {id} = ctx.user;
  //   // 获取momentId
  //   const {momentId} = ctx.params;
    
  //   try{
  //     // 将用户的id和momentId传给封装好的authService进行查询校对权限
  //     const isPermission = await authService.checkMomentUpate(id, momentId);
  //     console.log(isPermission)
  //     if(!isPermission) throw new Error();
  //     // // 下一步
  //     await next();
  //   }catch(err) {
  //     const error = new Error(errorTypes.NO_PERMISSION);
  //     return ctx.app.emit('error', error, ctx);
  //   }
  // }


  /**
   *  可以使用两种方式把我们的权限的验证变成通用的
   *  1. 闭包
   *  2. 通过路由传参的风格
   */
  // 方式一
  // const verifyPermissiom = (tableName) => {
  //   return async(ctx, next) => {
  //     // 获取当前用户id
  //     const {id} = ctx.user;
  //     // 获取momentId
  //     const {momentId} = ctx.params;
      
  //     try{
  //       // 将用户的id和momentId传给封装好的authService进行查询校对权限
  //       const isPermission = await authService.checkResource(tableName, id, momentId);
  //       console.log(isPermission)
  //       if(!isPermission) throw new Error();
  //       // // 下一步
  //       await next();
  //     }catch(err) {
  //       const error = new Error(errorTypes.NO_PERMISSION);
  //       return ctx.app.emit('error', error, ctx);
  //     }
  //   }
  // }

  // 方式二
  const verifyPermissiom = async(ctx, next) => {
    // 获取当前用户id
    const {id} = ctx.user;
    // 获取当前表名
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    // 获取resourceId
    const resourceId = ctx.params[resourceKey];  
    try{
      // 将用户的id和momentId传给封装好的authService进行查询校对权限
      const isPermission = await authService.checkResource(tableName, id, resourceId);
      if(!isPermission) throw new Error();
      // 下一步
      await next();
    }catch(err) {
      const error = new Error(errorTypes.NO_PERMISSION);
      return ctx.app.emit('error', error, ctx);
    }
  }


module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermissiom
}