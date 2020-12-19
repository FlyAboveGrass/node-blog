const handleBlogRouter = (req, res) => {
    if(req.url === '/blog' && req.method === 'GET'){
        return {'blog': '获取博客'}
    }
}

module.exports = handleBlogRouter