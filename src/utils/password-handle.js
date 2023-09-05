// 导入node自带的加密库cryto
const crypto = require('crypto');

// 密码加密处理函数
const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}

// 导出
module.exports = md5password;
