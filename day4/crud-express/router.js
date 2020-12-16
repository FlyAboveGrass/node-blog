const fs = require('fs')
const express = require('express')
const router = express.Router()
const {getStudents, findStudents, addStudent, editStudent, delStudent} = require('./student')


router.get('/', (req, res) => {
    getStudents((students) => {
        res.render('index.html', {
            fruits: [
                '苹果',
                '菠萝',
                '香蕉',
            ],
            students: students
        })
    })
})

router.get('/students/edit', (req, res) => {
    findStudents(req.query.id, (student) => {
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', (req, res) => {
    console.log('req', req.body )
    editStudent(req.body, (err) => {
        if(err !== undefined) throw err
        res.redirect('/')
    })
})

router.get('/students/new', (req, res) => {
    res.render('new.html')
})

router.post('/students/new', (req, res) => {
    console.log('req', req.body)
    addStudent(req.body, (result) => {
        if(result !== undefined){
            return ;
        } 
        res.redirect('/')
    })
})

router.get('/students/delete', (req, res) => {
    delStudent(req.query.id, (err) => {
        if(err !== undefined) {
            return ;
        }
        res.redirect('/')
    })
})

module.exports = router