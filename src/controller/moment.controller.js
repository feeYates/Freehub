// 导入fs模块
const fs = require('fs');

// 导入momentService
const momentService = require('../service/moment.service');
// 导入 fileService 
const fileService = require('../service/file.service');
// 导入路径常量 
const { PICTURE_PATH } = require('../constant/file-path');

class MomentController {
  async create(ctx, next) {
    // 获取动态信息和当前的用户id
    const content = ctx.request.body.content;
    const userId = ctx.user.id;
    // 将动态信息传递给momentService,将其保存到数据库中
    const result = await momentService.create(content, userId);
    // 返回结果
    ctx.body = result;
  }

  // 查询某一条动态
  async detail(ctx, next) {
    // 获取当前的momentId
    const momentId = ctx.params.momentId;
    // 将momentId返回给momnetSerivce对数据库进行操作
    const result = await momentService.getMomentById(momentId);
    // 返回结果
    ctx.body = result;
  }

  // 查询多条动态列表
  async list(ctx, next) {
    // 获取参数 offset size
    const {offset, size} = ctx.query;
    // 将offset size 返回给momentService对数据库进行操作
    const result = await momentService.getMomentList(offset, size);
    // 返回结果
    ctx.body = result;
  }

  // 更新某一条动态
  async update(ctx, next) {
    // 拿到momentId
    const { momentId } = ctx.params;
    // 拿到修改后的内容content
    const {content} = ctx.request.body;
    // 将momentId和content返回给momentService进行处理
    const result = await momentService.update(momentId, content);
    // 返回结果
    ctx.body = result;
  }


  // 删除某一条动态
  async remove(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.params;
    // 将momentId返回给momentService进行处理
    const result = await momentService.remove(momentId);
    // 返回结果
    ctx.body = result;
  }

  // 给动态添加标签
  async addLables(ctx, next) {
    // 获取标签lables
    const { lables } = ctx;
    // 获取momentId
    const { momentId } = ctx.params;

    // 添加所有你标签 
   try {
    for(let lable of lables) {
      // 先要确定动态和标签是否有关系
      const isHasLable = await momentService.hasLbale(momentId, lable.id);
      if(!isHasLable) {
        const resullt = await momentService.addLable(momentId, lable.id);
      }
    }
   } catch(err) {
    console.log(err)
   }
    ctx.body = {
      message: '添加标签成功',
      status: 200
    };
  }

  // 获取动态配图信息展示
  async fileInfo(ctx, next) {
    // 获取filename
    let { filename } = ctx.params;
    // 获取type
    const { type } = ctx.query;
    // 将filename传给fileService获取图片信息
    const fileInfo = await fileService.getInfoByFileName(filename);
    // 定义types有的类型
    const types = ["large", "middle", "small"];
    if(types.some(item => item === type)) {
      console.log(111)
      filename = filename + '-' + type;
    }
    console.log(filename)
    // 设置文件响应类型
    ctx.response.set('content-type', fileInfo.mimetype);
    // 读取文件
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    console.log(`${PICTURE_PATH}/${fileInfo.filename}`)
  }
}

module.exports = new MomentController(); 