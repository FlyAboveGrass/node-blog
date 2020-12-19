const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 这里是请求的处理
const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    // const { method, query, url, body } = req
    // console.log('file: app.js ~ line 9 ~ serverHandler ~ { method, query, url, body }', { method, query, url, body });

    const blogData = handleBlogRouter(req, res)
    if(blogData) {
        // 要用stringify而不是parse
        res.end(JSON.stringify(blogData))
        return 
    }

    const userData = handleUserRouter(req, res)
    if(userData) {
        // 要用stringify而不是parse
        res.end(JSON.stringify(userData))
        return 
    }

    res.end('404')
}

module.exports = serverHandler