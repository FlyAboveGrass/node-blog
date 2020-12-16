var fs = require('fs')
// console.log('file: file.js ~ line 2 ~ fs', fs);

// 创文件夹
// fs.mkdir('./hello', function(err) {
//     if(err) {
//         console.log(err)
//         return 
//     }
//     console.log('创建文件成功')
// })

let filePath = './hello/hello.txt'
// 写入文件（覆盖式写入）
fs.writeFile(filePath, 'hello world and node.js', (err) => {
    if(err) {
        console.log('写入文件失败', err)
        return
    }
})

// 读取文件， 出来的是二进制流，需要转换
fs.readFile(filePath, (err, data) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(data.toString())
})

// 改动文件
// 在文件追加内容
fs.appendFile(filePath, '追加内容', (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log('追加内容成功')
})

// 重命名
// fs.rename(filePath, './hello/hello2.txt', (err) => {
//     if(err) {
//         console.log(err)
//         return
//     }
//     console.log('重命名成功')
// })
