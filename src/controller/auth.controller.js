const jwt = require('jsonwebtoken');

const {PRIVATE_KEY, PUBLIC_KEY} = require('../app/config');

// 创建authController
class AuthController {
  // 登录处理
  async login(ctx, next) {
    // 获取用户的 name 和 id
    const {id, name} = ctx.user;

    // 生成token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, //过期时间s
      algorithm: 'RS256', // 算法RSA
    });
    
    // 将结果展示回去
    ctx.body = {id, name, token}
  }

  // 测试token成功的处理
  async success(ctx, next) {
    ctx.body = '授权成功'
  }
}

module.exports = new AuthController();