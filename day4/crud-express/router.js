const fs = require('fs')
const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '菠萝',
                '香蕉',
            ],
            students: JSON.parse(data).students
        })
    })
})

router.get('/students/edit', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('学生信息读取失败', err)
        }
        const student = JSON.parse(data).students.find((item) => {
            console.log(req.query.id, item.id)
            return item.id == req.query.id
        })
        
        console.log('student', JSON.parse(data).students, student)
        res.render('edit.html', {
            student: student
        })
    })
})

module.exports = router