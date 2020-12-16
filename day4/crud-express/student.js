const fs = require('fs')

const dbPath = './db.json'
exports.getStudents = function(callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        const students = JSON.parse(data).students
        callback(students)
        return students
    })
}

exports.findStudents = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        const student = JSON.parse(data).students.find((item) => {
            return item.id == id
        })
        callback(student)
        return student
    })
}

exports.addStudent = function(params, callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        const students = JSON.parse(data).students
        params = Object.assign({ id: (students[students.length -1] && students[students.length -1].id + 1) || 0 }, params)
        students.unshift(params)
        fs.writeFile(dbPath, JSON.stringify({
            students: students
        }), (err) => {
            console.log('写入文件失败')
            callback(err)
        })
        callback()
    })
}

exports.editStudent = function(params, callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        const sdata = JSON.parse(data).students
        const index = sdata.findIndex((item) => {
            return item.id.toString() === params.id
        })

        if(index === -1) return res.status(200).send('学生信息不存在')

        sdata[index] = params
        
        fs.writeFile(dbPath, JSON.stringify({
            students: sdata
        }), (err) => {
            if(err) {
                console.log('写入文件失败', err)
                return callback(err)
            }
            callback()
        })
    })
}

exports.delStudent = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        let students = JSON.parse(data).students
        
        students = students.filter((item) => {
            return item.id.toString() !== id
        })
        console.log('file: student.js ~ line 78 ~ fs.readFile ~ students', students);
        
        fs.writeFile(dbPath, JSON.stringify({
            students: students
        }), (err) => {
            if(err) {
                console.log('写入文件失败', err)
                return callback(err)
            }
            callback()
        })
    })
}