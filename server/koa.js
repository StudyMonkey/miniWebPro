const koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const app = new koa();
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname+ '/'));
router.get('/demo', async ctx => {
    ctx.body = '<div>Hello World</div>'
})
router.get('/test', async ctx => {
    const { isbn } = ctx.query;
    console.log(ctx.query);
    const res = await axios.get('https://api.douban.com/v2/book/isbn/'+ isbn);
    // console.log('res', res);
    ctx.body = res.data;
})

app.use(router.routes());

app.listen(3999, () => {
    console.log('开始监听3999端口');
})
