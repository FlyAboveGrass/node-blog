const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBlogList, getBlogDetail } = require('../controller/blog')

router.get('/detail', async (req, res) => {
    const { id } = req.query
    if(!id) return res.json(new ErrorModel(data, '获取列表失败'));
    const data = await getBlogDetail(id)
    data ? res.json(new SuccessModel(data, '获取列表成功')) : res.json(new ErrorModel(data, '获取列表失败'))
})

router.get('/list', async (req, res) => {
    const data = await getBlogList(req.query)
    data ? res.json(new SuccessModel(data, '获取列表成功')) : res.json(new ErrorModel(data, '获取列表失败'))
})

module.exports = router