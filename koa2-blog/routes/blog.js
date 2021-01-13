const router = require('koa-router')();
const { SuccessModel, ErrorModel, errData } = require('@/model/resModel')
const { getBlogList, getBlogDetail, delBlog } = require('@/controller/blog')
const loginCheck = require('@/middleware/loginCheck')

router.prefix('/api/blog');

router.get('/list', loginCheck, async (ctx, next) => {
    const author = ctx.session.username
    const keyword = ctx.query.keyword

    const data = await getBlogList(author, keyword)
    ctx.body = data ? new SuccessModel(data, '获取列表成功') : new ErrorModel(data, '获取博客失败')
})

router.get('/detail', async (ctx, next) => {
    const { id } = ctx.query
    if(!id) {
        ctx.body = new ErrorModel(errData, '获取博客失败')
        return;
    }
    const data = await getBlogDetail(id)
    ctx.body = data ? new SuccessModel(data, '获取博客成功') : new ErrorModel(data, '获取博客失败')
})


router.post('/add', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username

    const data = await addBlog(body) 
    ctx.body = data ? new SuccessModel(data, '获取博客成功') : new ErrorModel(data, '获取博客失败')
})


router.get('/del', loginCheck, async (ctx, next) => {
    const id =  ctx.query.id
    const { isAdmin, username } = ctx.session
    if(!id) {
        ctx.body = new ErrorModel(errData, '文章找不到')
        return;
    }
    const data = await delBlog(id, username, isAdmin)
    ctx.body = data ? new SuccessModel(data, '删除博客成功') : new ErrorModel(data, '删除博客失败')
})

router.post('/update', loginCheck, async (ctx, next) => {
    const { id, title, content } = ctx.request.body
    const { author, isAdmin } = ctx.session.username
    
    if(!id) {
        ctx.body = new ErrorModel(errData, '更新博客失败')
        return;
    }
    if(curUser !== author && !isAdmin) {
        ctx.body = new ErrorModel(errData, '只能修改自己的博客')
        return;
    }

    const data = await updateBlog(id, {title, content, author})
    ctx.body = data ? new SuccessModel(data, '更新博客成功') : new ErrorModel(data, '更新博客失败')
})

module.exports = router;