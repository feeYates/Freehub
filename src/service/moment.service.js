// 导入数据库连接
const connection = require('../app/database');

// 抽取相同的代码片段
// const sqlFragment = `
//     SELECT 
//       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//       JSON_OBJECT('id', u.id, 'name', u.name) author
//     FROM moment m 
//     LEFT JOIN user u ON m.user_id = u.id
// `

// 创建MomentService
class MomentService {
  // 发布新增动态插入数据库
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  // 查询某一条动态的信息
  async getMomentById(id) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, "avatar", u.avatar_url) author,
        IF(COUNT(l.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
          ),NULL) lables,
        (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 
                        'user', JSON_OBJECT('id', cu.id, 'name', cu.name, "avatar", cu.avatar_url))
          ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_lable ml ON ml.moment_id = m.id
      LEFT JOIN lable l ON l.id = ml.lable_id
      WHERE m.id = ?
      GROUP BY m.id
    `;
    const [result] = await connection.execute(statement, [id]);
    return result[ 0];
  }

  // 查询多条动态信息
  async getMomentList(offset, size) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_lable ml WHERE ml.moment_id = m.id) lableCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://loaclhost:8888/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ? , ?;
    `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  // 更新某条动态
  async update(momentId, content) {
    const statement= `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result
  }

  // 删除某条动态
  async remove(momentId) {
     try{
      const statement = `DELETE FROM moment WHERE id = ?;`;
      const [result] = await connection.execute(statement, [momentId]);
      return result; 
     }catch(err) {
      console.log(err);
     }
  }

  // 查询当前关系表是否已经存在标签
  async hasLbale(momentId, lableId) {
    try {
      // sql语句
      const statement = `SELECT * FROM moment_lable WHERE moment_id = ? AND lable_id = ?;`;
      const [result] = await connection.execute(statement, [momentId, lableId]);
      return result[0] ? true : false;
    } catch(err) {
      console.log(err)
    }
  }

  // 给动态添加标签
  async addLable(momentId, lableId) {
    try {
      // sql语句
      const statement = `INSERT INTO moment_lable (moment_id, lable_id) VALUES (? , ?);`;
      const [result] = await connection.execute(statement, [momentId, lableId]);
      return result;
    } catch(err) {
      console.log(err)
    }
  }
}

// 导出
module.exports = new MomentService();