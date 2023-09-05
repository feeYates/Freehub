const fs = require('fs');

// const useRoutes = (app) => {
//   fs.readdirSync(__dirname).forEach(file => {
//     if(file == 'index.js') return;
//     const router = require(`./${file}`);
//     app.use(router.routes());
//     app.use(router.allowedMethods());
//   })

// }

// 动态的读取我们的router并且自动挂载router
const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file == 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  })

}

module.exports = useRoutes