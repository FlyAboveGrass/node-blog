const { error } = require('console');
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://localhost/students';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// 让 mongoose 使用全局 Promise 库
// mongoose.Promise = global.Promise;

// 1.取得数据库连接
const db = mongoose.connection;
db.on('open', () => {
    console.log('connection open')
})
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

// 2. 创建一个schema对象约束数据类型
let catSchema = new mongoose.Schema({
    id: Number,
    name: String
})
// 3. 将schema对象转换成数据模型model
let Cat = new mongoose.model('Cat', catSchema)

// 4.拿到文档对象操作数据库
let kitty = new Cat({
    id: 2,
    name: 'null'
})

// // 增加数据
// kitty.save((error) => {
//     if(error){
//         return console.log('save error;', error)
//     }
//     console.log('save success')
// })

// 查询数据
// Cat.find({}, 'id id, name', (err, data) => {
//     if(err){
//         return console.log('query error;', err)
//     }
//     console.log('query success', data)
// }) 

Cat.deleteMany({name: null}, (err) => {
    if(err){
        return console.log('error;', err)
    }
    console.log('success')
})

