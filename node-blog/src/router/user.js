const { login, registry } = require('@/controller/user')
const { ErrorModel, SuccessModel } = require("@/model/resModel")

const handleUserRouter = async (req, res) => {
    if(req.url === '/api/login' && req.method === 'POST'){
        const result = await login(req.body)
        console.log('file: user.js ~ line 7 ~ handleUserRouter ~ result', result);
        return !result ? new ErrorModel(result, '登录失败') : new SuccessModel(result, '登录成功')
    }
    if(req.url === '/api/registry' && req.method === 'POST'){
        const result = await registry(req.body)
        return !result ? new ErrorModel(result, '注册失败') : new SuccessModel(result, '注册成功')
    }
}

module.exports = handleUserRouter