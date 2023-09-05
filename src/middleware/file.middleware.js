// 导入path 模块
const path = require('path');
// 导入koa-multer
const Multer = require('@koa/multer');
// 导入Jimp 图像尺寸处理
const Jimp = require('jimp');
// 导入头像路径常量
const { AVATAR_PATH, PICTURE_PATH} = require('../constant/file-path');

// 创建uploadAvatar
const upLoadAvatar = Multer({
  dest: AVATAR_PATH
});
// 创建handleUploadAvatar
const handleUpLoadAvatar = upLoadAvatar.single('avatar');

// 创建upLoadPicture
const upLoadPicture = Multer({
  dest: PICTURE_PATH
});
// 创建handleUploadPicture
const handleUploadPicture = upLoadPicture.array('picture');

// 对图片的尺寸进行处理(sharp/jimp)
// sharp 体积稍微大一点
// jimp 体积比sharp比较小
const pictureReSize = async(ctx, next) => {
  // 获取所有图像信息
  const files = ctx.request.files;
  try {
    // 遍历图像信息
    for(let file of files) {
       // 重新定义路径
      const destPath = path.join(file.destination, file.filename)
      Jimp.read(file.path).then(image => {
        // 处理成1280尺寸
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        // 处理成640尺寸
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        // 处理成320尺寸
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      })
    }
    // 执行下一步
    await next();
  } catch(err) {
    console.log(err);
  }
}

// 导出
module.exports = {
  handleUpLoadAvatar,
  handleUploadPicture,
  pictureReSize
}
