const http = require('http')
const url = require('url')
const queryString = require('querystring')

// 创建一个node的server,监听
// req对象是http.IncomingMessage的实例，我们可以在req对象中获得请求头部，请求体中的参数等信息。
// res对象是http.ServerResoponse的实例，我们可以通过res的方法设置响应信息。
const server = http.createServer((request, response) => {
    // response.write('hello http', request.url)
    // response.end('res end');
})

// 单独监听
server.on('request', (req, res) => {
    // console.log('url.parse(req.url)', url.parse(req.url));
    // console.log('queryString.parse(url.parse(req.url).query)', queryString.parse(url.parse(req.url).query));
 
    // 设置响应头
    // 
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    // 响应体的状态码
    res.writeHead(404)
    // 结束响应体
    res.end('on res end');
})

// 监听3000端口
server.listen(3000, () => {
    console.log('server in http://127.0.0.1:3000')
})