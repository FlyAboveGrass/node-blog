const { SuccessModel, ErrorModel, errData } = require('@/model/resModel');
const {queryUser} = require('@/controller/user')

var router = require('koa-router')();

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    const result = await queryUser(username, password)

    if (result) {
        // 将用户信息保存在session以及redis中
        if (result.username) {
            ctx.session.username = result.username;
        }
        if (result.isadmin) {
            ctx.session.isAdmin = 1;
        }
        ctx.body = new SuccessModel("登录成功");
    } else {
        ctx.body = new ErrorModel(errData, '登录失败')
    }
});

router.get('/session-test', async (ctx, next) => {
    if(ctx.session.viewCount === null) {
        ctx.session.viewCount = 0;
    }

    ctx.session.viewCount ++;
    ctx.body = {
        error: 0,
        viewCount: ctx.session.viewCount
    }
});

router.get('/login-out', (ctx, next) => {
    ctx.session.userName = null;
    ctx.session.isAdmin = null;
    ctx.body = new SuccessModel("退出成功");
})

module.exports = router;
