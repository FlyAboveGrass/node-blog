const express = require('express')
const app = express()
const express_art_template = require('express-art-template')
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引用模板引擎
// 第一个参数表示的是将哪一种文件识别为模板引擎的文件
app.engine('html', express_art_template)

// 修改默认的模板引擎文件路径
// app.set('views', render函数的默认路径)

app.get('/', (req, res) => {
    res.render('index.html',{
        comments: comments
    })
})
app.get('/post', (req, res) => {
    res.render('post.html',{})
})
app.post('/post', (req, res) => {
    console.log('post', req.body)
    comments.unshift({
        name: req.body.name,
        message: req.body.message,
        dateTime: '2015-10-16'
    })
    res.redirect('/')
})

app.get('/404', (req, res) => {
    // render函数默认是不可用的,但是一旦调用app.engine指定模板引擎之后,就可以使用render渲染模板引擎
    // render第一个参数接收的是views里面的一个文件名,而不是真实的路径.express推荐在views中存放所有的视图
    res.render('404.html',{})
})

app.listen(3000, () => {
    console.log('server is run in http://127.0.0.1:3000')
})








var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]