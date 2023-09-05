const service = require('../service/comment.service');

// 创建commentController
class commentController {
  // 新增评论
  async create(ctx, next) {
    // 获取当前用户的id
    const { id } = ctx.user;
    // 获取当前动态的id momentId  评论的内容 content
    const { momentId, content } = ctx.request.body; 
    // 将用户id 动态id 动态评论 userId momentId content传给comment.service进行处理
    const result = await service.create(content, id, momentId);
    
    // 返回结果
    ctx.body = result;
    
  }

  // 新增回复评论
  async reply(ctx, next) {
    // 获取当前用户的id
    const { id } = ctx.user;
    // 获取当前动态的id momentId  评论的内容 content
    const { momentId, content } = ctx.request.body;
    // 获取当前的commentId 
    const { commentId } = ctx.params;
    // 将用户id 动态id 回复评论 回复评论的id userId momentId contetn commentId 传给comment.service进行处理
    const result = await service.reply(content, id, momentId, commentId);
    // 返回结果
    ctx.body = result;
  }

  // 修改评论
  async update(ctx, next) {
    // 获取修改评论id commentId
    const { commentId } = ctx.params;
    // 获取修改评论的内容
    const { content } = ctx.request.body;
    // 将评论id 评论内容 commentId content 传给comment.service进行处理
    const result = await service.update(commentId, content);
    // 返回结果
    ctx.body = result;
  }

  // 删除评论
  async remove(ctx, next) {
    // 获取评论id commentId
    const { commentId } = ctx.params;
    // 将评论的id commentId 传给comment.service进行处理
    const result = await service.remove(commentId);
    // 返回结果
    ctx.body = result;
  }

  // 获取评论列表
  async list(ctx, next) {
    // 获取动态id momentId
    const { momentId } = ctx.query;
    // 将动态id momentId 传给comment.service进行处理
    const result = await service.list(momentId);
    // 返回结果
    ctx.body = result;
  }
}

module.exports = new commentController();