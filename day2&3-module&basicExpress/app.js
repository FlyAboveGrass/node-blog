const express = require('express')

// 创建服务器的方式更简单
const app = express()

// 公开指定路径,浏览器端可以通过暴露出来的 /public/ 访问这个目录下的资源
app.use('/public/', express.static('./public/'))

// 不指定路径,暴露public文件夹.并且浏览器访问资源的时候可以不加public/前缀
// app.use(express.static('./public/'))

// 路由一个个监听,不像原生node那样要在一个函数里面同时监听
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/about', (req, res) => {
    res.send('hello express')
})

app.listen(3000, () => {
    console.log('server is run in http://127.0.0.1:3000')
})  