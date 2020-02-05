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

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(router.routes());

  server.listen(3000, () => {
    console.log("koa server is listening on port 3000");
  });
});
