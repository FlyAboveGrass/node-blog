const express = require('express')
const app = express()
const express_art_template = require('express-art-template')
var bodyParser = require('body-parser')
const fs = require('fs')
const router = require('./router')

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 暴露public和node_moduls
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.use(router)
// 引用模板引擎
// 第一个参数表示的是将哪一种文件识别为模板引擎的文件
app.engine('html', express_art_template)

// 修改默认的模板引擎文件路径
// app.set('views', render函数的默认路径)




app.listen(3000, () => {
    console.log('server is run in http://127.0.0.1:3000')
})
