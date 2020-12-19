const { getBlogList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    console.log('file: blog.js ~ line 5 ~ handleBlogRouter ~ req', req);
    if(req.url === '/blog' && req.method === 'GET'){
        const data =  getBlogList(req)
        return new SuccessModel(data, '获取博客列表成功')
    }
    if(req.url === '/api/blog/detail' && req.method === 'POST'){
        const data =  getBlogList(req)
        return data ? new SuccessModel(data, '获取博客成功') : new ErrorModel(data, '获取博客失败')
    }
    if(req.url === '/api/blog/new' && req.method === 'POST'){
        const data =  getBlogList(req)
        return data ? new SuccessModel(data, '新建博客成功') : new ErrorModel(data, '新建博客失败')
    }
    if(req.url === '/api/blog/update' && req.method === 'POST'){
        const data =  getBlogList(req)
        return data ? new SuccessModel(data, '更新博客列表成功') : new ErrorModel(data, '更新博客列表失败')
    }
    if(req.url === '/api/blog/del' && req.method === 'POST'){
        const data =  getBlogList(req)
        return data ? new SuccessModel(data, '删除博客列表成功') : new ErrorModel(data, '删除博客列表失败')
    }
}

module.exports = handleBlogRouter