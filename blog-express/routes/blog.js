const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBlogList, getBlogDetail, delBlog } = require('../controller/blog')
const loginCheck = require('@/middleware/loginCheck')

router.get('/detail', async (req, res) => {
    const { id } = req.query
    if(!id) return res.json(new ErrorModel(data, '获取博客失败'));
    const data = await getBlogDetail(id)
    data ? res.json(new SuccessModel(data, '获取博客成功')) : res.json(new ErrorModel(data, '获取博客失败'))
})

router.get('/list', loginCheck, async (req, res, next) => {
    const data = await getBlogList(req.query)
    data ? res.json(new SuccessModel(data, '获取列表成功')) : res.json(new ErrorModel(data, '获取列表失败'))
})

router.get('/del', loginCheck, async (req, res, next) => {
    const author = req.session.username
    const id =  req.query.id
    const data = await delBlog(id)
    console.log('file: blog.js ~ line 23 ~ router.get ~ data', data);
    data ? res.json(new SuccessModel(data, '删除博客成功')) : res.json(new ErrorModel(data, '删除博客失败'))
})

module.exports = router