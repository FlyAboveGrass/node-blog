const { getBlogList } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    if(req.url === '/blog' && req.method === 'GET'){
        const data =  getBlogList(req)
        return new SuccessModel(data, '获取博客列表成功')
    }
}

module.exports = handleBlogRouter