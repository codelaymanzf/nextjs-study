## 引入 koa

- nextjs 自身带有的服务器，只能处理 SSR
- nextjs 无法处理服务端的数据接口、数据库连接、session 状态
- koa 是一个非常流行的轻量级 nodejs 服务端框架
- koa 非常易于扩展
- 项目本身相对轻量，并不需要很多集成功能

## 安装 redis

- mac 下安装 redis `brew install redis`
- nodejs 连接 redis `npm i ioredis --save`

## 集成 antd

- nextjs 默认不支持 css 文件，需引入`npm i @zeit/next-css --save`
- 安装`npm i babel-plugin-import --save-dev`此插件与配置`.babelrc` 进行按需加载
- `pages`目录下添加`_app.js`文件，引入`import "antd/dist/antd.css"`样式
  > 未按需引入 antd 样式的原因有二：1）webpack mini-css-extract-plugin 有 bug，暂时未很好的解决(https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250) 2)antd css 文件相对于 js 文件来说也不是很大
