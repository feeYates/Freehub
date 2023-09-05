// 导入connection
const connection = require('../app/database');

class AuthService {
  // 检查当前用户是否具更新moment的权限
  async checkResource(resourceTable, userId, id) {
    // 创建sql语句
    const statement = `SELECT * FROM ${resourceTable} WHERE id = ? AND user_id = ?;`;
    // 执行sql语句
    const [result] = await connection.execute(statement, [id, userId]);
    // 判断当前返回值是否为空
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();