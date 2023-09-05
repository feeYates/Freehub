// 导入数据库连接池
const connection = require('../app/database');

// 创建lableService
class lableService {
  // 发布标签
  async create(name) {
    try {
      // sql语句
      const statement = `INSERT INTO lable (name) VALUES(?);`;
      // 执行sql语句
      const [result]  = await connection.execute(statement, [name]);
      // 返回结果
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  // 通过name查询当前标签是否存在
  async getLableByName(name) {
    try {
      // sql语句
      const statement = `SELECT * FROM lable WHERE name = ?;`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [name]);
      // 返回结果
      return result[0];
    } catch(err) {
      console.log(err)
    }
  }

  // 获取标签列表
  async list(offset, limit) {
    try {
      // sql语句
      const statement = `SELECT * FROM lable LIMIT ? , ?;`;
      // 执行sql语句 
      const [result] = await connection.execute(statement, [offset, limit]);
      // 返回结果
      return result;
    } catch(err) {
      console.log(err)
    }
  }
}

// 导出lableService
module.exports = new lableService();