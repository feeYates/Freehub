// 导入app
const app = require('./app/index');

// 导入config里面的端口配置信息
const {APP_PORT} = require('./app/config');


// 监听端口
app.listen(APP_PORT, (ctx, next) => {
  console.log(`服务器启动在${APP_PORT}端口`);
})