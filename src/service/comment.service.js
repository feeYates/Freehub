// 导入数据库连接池
const connection = require('../app/database');

// 创建commentService
class commentService {
  // 将数据传递给数据库 保存评论
  async create(content, userId, momentId) {
    try {
      // sql语句
      const statement = `INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [content, userId, momentId]);
      // 返回结果
      return result;
    }catch(err) {
     console.log(err)
    }
  }

  // 将数据传递给数据库 保存回复评论
  async reply(content, userId, momentId, commentId) {
    try{
      // sql语句
      const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?)`;
      // 执行sql语句
      const [result] = await connection.execute(statement, [content, userId, momentId, commentId]);
      // 返回结果
      return result;
    }catch(err) {
      console.log(err);
    }
  }

  // 将数据传递给数据库 更新评论内容
  async update(commentId, content) {
    try {
      // sql语句
      const statement = `UPDATE comment SET content=? WHERE id=?; `;
      // 执行sql语句
      const [result] = await connection.execute(statement, [content, commentId]);
      // 返回结果
      return result;
    }catch(err) {
      console.log(err);
    }
  }

  // 将数据传递给数据库 删除评论
  async remove(commentId) {
    try {
      // sql语句
      const statement = `DELETE FROM comment WHERE id=?`;
      // 执行sql语句
      const result = await connection.execute(statement, [commentId]);
      // 返回结果
      return result;
    }catch(err) {
      console.log(err)
    }
  }

  // 获取评论的列表
  async list(momentId) {
    try {
      // sql语句
      const statement = `
      SELECT 
        c.id, c.content, c.moment_id momentId, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE moment_id = ?;
    `;
      const result = await connection.execute(statement, [momentId]);
      return result; 
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = new commentService();