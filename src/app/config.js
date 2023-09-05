// 引入dotenv这个库
const dotenv = require('dotenv');
// 引入fs模块
const fs = require('fs');
// 引入path模块
const path = require('path');

// 调用dotenv这个config方法，然后就可以通过process.env方法获取.env文件里面的信息
dotenv.config();

// 读取私钥文件 因为考虑到担心路径写错，所以写绝对路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
// const PRIVATE_KEY = fs.readFileSync('./src/app/keys/private.key');
// 读取公钥
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));  
// const PUBLIC_KEY = fs.readFileSync('./src/app/keys/public.key'); 

// 尝试获取.env文件的端口号
// console.log(process.env.APP_PORT)

// 从process.env获取端口号等信息导出
// const {APP_PORT} = process.env;np
// module.exports = {APP_PORT};

// 从process.env获取端口号等信息导出(更加简便的写法)


module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;