const handleBlogRouter = require('@/router/blog')
const handleUserRouter = require('@/router/user')
const queryString = require('querystring')


// 这里是请求的处理
const serverHandler = async (req, res) => {
    // 处理请求参数
    req.query = queryString.parse(req.url.split('?')[1])
    req.url = req.url.split('?')[0]

    if(req.method === 'POST') {
        req.body = await formatPostData(req)
    }

    // 设置响应头
    res.setHeader('Content-type', 'application/json')

    const blogData = await handleBlogRouter(req, res)
    if(blogData) {
        // 要用stringify而不是parse
        res.end(JSON.stringify(blogData))
        return 
    }

    const userData = await handleUserRouter(req, res)
    if(userData) {
        // 要用stringify而不是parse
        res.end(JSON.stringify(userData))
        return 
    }

    res.end('404')
}

// 错误的写法
// const formatPostData = async (req) => {
//     let postData = ''
//     await req.on('data', chunk => {
//         postData += chunk.toString()
//         console.log('1. postData', postData);
//     })
//     await req.on('end', () => {
//         console.log('2. JSON.stringify(postData)', JSON.stringify(postData))
//         return JSON.stringify(postData)
//     })
//     console.log('3. complete')
// }

// 合理的写法
const formatPostData = (req) => {
    let postData = ''
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json'){
            resolve({})
            return 
        }
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            // JSON.parse这个方法要求是严格的json格式，必须是用 "" 来定义变量名和值，单引号不可以
            resolve(JSON.parse(postData))
        })
    })
}


module.exports = serverHandler