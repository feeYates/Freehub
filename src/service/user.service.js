// 引入database
const connection = require('../app/database');

class UserService {

  // 创建用户
  async create(user) {
    // 将user储存到数据库中
    // 获取name和password
    const { name, password } = user;
    // 插入语句
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`
    // 执行SQL语句
    const result = await connection.execute(statement, [name, password]);
    return result[0];
  }
  
  // 查询用户是否存在
  async getUserByNames(name) {
    try {
      // sql语句
      const statement = `SELECT * FROM user WHERE name = ?;`;
      // 执行sql语句
      const result = await connection.execute(statement, [name]);
      // 返回结果
      return result[0];
    } catch(err) {
      console.log(err)
    }

  }

  // 通过userId更新avatarUrl
  async updateAvatarUrlByUserId(avatarUrl, userId) {
    try {
      // sql语句
      const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [avatarUrl, userId]);
      // 返回结果
      return result;
    } catch(err) {
      console.log(err)
    }
  }
}

// 导出
module.exports = new UserService();