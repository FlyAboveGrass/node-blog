const router = require('koa-router')();

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    ctx.body = {
        error: 0,
        data: {
            list : [1,2,3]
        }
    }
})

module.exports = router;