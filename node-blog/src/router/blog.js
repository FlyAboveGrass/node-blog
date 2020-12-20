const {
    getBlogList,
    getBlogDetail,
    addBlog,
    updateBlog,
    delBlog
} = require('@/controller/blog')
const { SuccessModel, ErrorModel } = require('@/model/resModel')

const handleBlogRouter = async (req, res) => {

    // 路由处理
    if(req.url === '/api/blog/list' && req.method === 'GET'){
        const data =  await getBlogList(req.query)
        return data ? new SuccessModel(data, '获取博客列表成功') : new ErrorModel(data, '获取博客列表失败')
    }
    if(req.url === '/api/blog/detail' && req.method === 'GET'){
        console.log(' handleBlogRouter ~ req', req.query);
        const data =  getBlogDetail(req.query)
        return data ? new SuccessModel(data, '获取博客成功') : new ErrorModel(data, '获取博客失败')
    }
    if(req.url === '/api/blog/new' && req.method === 'POST'){
        const data =  addBlog(req.body)
        return data ? new SuccessModel(data, '新建博客成功') : new ErrorModel(data, '新建博客失败')
    }
    if(req.url === '/api/blog/update' && req.method === 'POST'){
        console.log('req.body', req.body)
        const data =  updateBlog(req.body)
        return data ? new SuccessModel(data, '更新博客列表成功') : new ErrorModel(data, '更新博客列表失败')
    }
    if(req.url === '/api/blog/del' && req.method === 'DELETE'){
        const data =  delBlog(req.body)
        return data ? new SuccessModel(data, '删除博客列表成功') : new ErrorModel(data, '删除博客列表失败')
    }
}

module.exports = handleBlogRouter