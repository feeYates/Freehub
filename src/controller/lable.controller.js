// 导入lable.service
const service = require('../service/lable.service');

// 创建lableController
class lableController {
  // 创建标签
  async create(ctx, next) {
    // ctx.body = '发布标签成功';
    // 获取标签名称
    const { name } = ctx.request.body;
    // 将标签名传给lable.service进行处理
    const result = await service.create(name);
    // 返回结果
    ctx.body = result;
  }

  // 获取标签列表
  async list(ctx, next) {
    // 获取offset limit
    const {offset, limit} = ctx.query;
    // 将标签名传给lable.service进行处理
    const result = await service.list(offset, limit);
    // 返回结果
    ctx.body = result;
  }

}

// 导出lableController
module.exports = new lableController();