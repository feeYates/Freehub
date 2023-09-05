// 导入数据库连接池
const connection = require('../app/database');

// 创建fileService
class fileService {
  // 将头像信息保存到数据库中
  async createAvatar(filename, mimetype, size, userId) {
      try {
        // sql语句
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
        // 执行sql语句
        const result = await connection.execute(statement, [filename, mimetype, size, userId]);
        // 返回结果
        return result;
      } catch(err) {
        console.log(err);
      }
  }

  // 通过userId查询头像信息
  async getAvatarByUserId(userId) {
    try {
      // sql语句
      const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [userId]);
      // 返回结果
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  // 保存动态配图信息
  async createPicture(filename, mimetype, size, userId, momentId) {
    try {
      //  sql语句
      const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
      // 返回结果
      return result;
    } catch (err) {
      console.log(err);
    }
  }

    // 通过filename获取文件信息
    async getInfoByFileName(filename) {
      try {
        // sql语句
        const statement = `SELECT * FROM file WHERE filename = ?;`;
        // 执行sql语句
        const [result] = await connection.execute(statement, [filename]);
        // 返回结果
        return result[0];
      } catch(err) {
        console.log(err);
      }
    }
}

module.exports = new fileService();