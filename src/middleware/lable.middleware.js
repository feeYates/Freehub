// 导入lable.service
const service = require('../service/lable.service');

// 创建verifyLableExists验证当前lable是否存在
const verifyLableExists = async(ctx, next) => {
  // 获取所有的lables
  const { lables } = ctx.request.body;
  
  // 创建一个变量newLables保存新的lables
  const newLables = [];
    for(let name of lables) {
      // 将lable遍历传给lable.service里面的getLableByName进行处理
      const lableResult = await service.getLableByName(name);
      // 将name保存起来
      const lable = { name };
      if(!lableResult) {
        // 当前lable不存在 需要执行新增lable
        const result = await service.create(name);
        // 将插入成功的id保存到lable.id
        lable.id = result.insertId;
      } else {
        // 将查询到id保存到lable.id
        lable.id = lableResult.id;
      }
      // 将lable逐一保存到newLables上
      newLables.push(lable);
    } 
  // 将新的newLables挂在到ctx.lable上
  ctx.lables = newLables;
  // 下一步
  await next();
}
// 导出verifyLableExists
module.exports = {
  verifyLableExists
}