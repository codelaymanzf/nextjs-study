# nextjs 学习

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

## 项目目录结构

- `pages`目录下一个文件名，就代表一个路径，可嵌套
- `components`目录存放开发的公共组件
- `lib`目录存放 utils 或者第三方库文件
- `static`目录存放图片、CSS 等静态文件
- `next.config.js`存放配置文件

## 页面跳转

- `import Link from 'next/link'`
- `import Router from 'next/router'`

## 动态路由

```js
<Link href="/post?id=1"> </Link>;

Router.push({
  pathname: "/post",
  query: {
    id: 2
  }
});
```

## 获取路由参数

```js
import { withRouter } from "next/router";

const A = ({ router }) => <h2> {router.query.id}</h2>;

export default withRouter(A);
```

## 路由映射

> 页面路径由 `/post?id=1` 显示为 `/post/1`

```js
<Link href="/post?id=1" as="/post/1">
  {" "}
</Link>;

Router.push(
  {
    pathname: "/post",
    query: {
      id: 2
    }
  },
  "/post/2"
);
```

> 弊端：刷新页面会返回 404

```js
// 解决办法：koa, nextjs自带的服务无法解决此问题
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get("/post/:id", async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/post",
      query: { id }
    });
    ctx.respond = false; // 为了绕过 Koa 的内置 response 处理
  });

  server.use(router.routes());

  server.listen(3000, () => {
    console.log("koa server is listening on port 3000");
  });
});
```

## 数据获取方式 `getInitialProps`

- getInitialProps 方法 只在 pages 目录下才生效， 不能使用在子组件中
- 当服务渲染时，getInitialProps 将会把数据序列化，就像 JSON.stringify。所以确保 getInitialProps 返回的是一个普通 JS 对象，而不是 Date, Map 或 Set 类型。
- 当页面初始化加载时，getInitialProps 只会加载在服务端。只有当路由跳转（Link 组件跳转或 API 方法跳转）时，客户端才会执行 getInitialProps。

  > 获取流程：`getInitialProps`方法获取数据——返回结果绑定到组件 props 上——组件开始渲染
  > <br>
  > 若`getInitialProps`为异步获取数据，也需等数据返回后，才传入组件的 props，此时组件才开始渲染
