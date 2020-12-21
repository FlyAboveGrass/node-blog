const { login, registry } = require('@/controller/user')
const { getRedis } = require('@/db/redis')
const { ErrorModel, SuccessModel } = require("@/model/resModel")

const handleUserRouter = async (req, res) => {
    if(req.url === '/api/user/login' && req.method === 'GET'){
        const result = await login(req.query)
        // 设置返回的cookie值。 httpOnly 不允许客户端通过js修改； path=/ 作用于根路径；  expires 设置过期时间。
        if(result) {
            res.setHeader('Set-cookie', `userid=${result.id};path=/;httpOnly;expires=${getCookieExpires()};`)
        }
        return !result ? new ErrorModel(result, '登录失败') : new SuccessModel(result, '登录成功')
    }
    if(req.url === '/api/user/login-check-test' && req.method === 'GET'){
        const result = await getRedis(req.cookie.userid).catch(err => null)
        return !result ? new ErrorModel(result, '登录失败') : new SuccessModel(result, '登录成功')
    }
    if(req.url === '/api/user/registry' && req.method === 'POST'){
        const result = await registry(req.body)
        return !result ? new ErrorModel(result, '注册失败') : new SuccessModel(result, '注册成功')
    }
}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (15 * 24 * 60 * 60 * 1000))
    return d.toGMTString()
}

module.exports = handleUserRouter