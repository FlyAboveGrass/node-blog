// todo: 路径别名
const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express')
const router = express.Router()
const { queryUser } = require('../controller/user')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const result = await queryUser(username, password)
    console.log('file: user.js ~ line 10 ~ router.post ~ result', result);
    if(result) {
        // 设置session
        req.session.username = result.username
        req.session.realname = result.realname || ''
        res.json(new SuccessModel(result, '登录成功'))
        return 
    }
    res.json(new ErrorModel(result, '登录失败'))
})

router.get('/login-test', (req, res) => {
    if(req.session) {
        console.log(req.session);
        res.json({
            code: 0,
            msg: '登录了'
        })
        return
    }
    res.json({
        code: -1,
        msg: '没登录'
    })
})

module.exports = router;