const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    console.log('file: user.js ~ line 5 ~ router.post ~ req', req);
    res.json(req.body)
})

module.exports = router;