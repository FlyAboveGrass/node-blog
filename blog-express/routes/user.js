// todo: 路径别名
const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express')
const router = express.Router()
const { queryUser } = require('../controller/user')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const result = await queryUser(username, password)
    result&&result.length > 0 ? res.json(new SuccessModel(result, '登录成功')) : res.json(new ErrorModel(result, '登录失败'))
})

module.exports = router;