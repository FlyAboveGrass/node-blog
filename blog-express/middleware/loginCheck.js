const { ErrorModel } = require('@/model/resModel')

const loginCheck = (req, res, next) => {
    console.log('file: loginCheck.js ~ line 5 ~ loginCheck ~ req.session', req.session);

    if(req.session.username) {
        next()
        return 
    }
    res.json(new ErrorModel(null, '尚未登录'))
}

module.exports = loginCheck