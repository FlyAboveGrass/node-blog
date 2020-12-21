const { login, registry } = require('@/controller/user')
const { ErrorModel, SuccessModel } = require("@/model/resModel")

const handleUserRouter = async (req, res) => {
    if(req.url === '/api/user/login' && req.method === 'GET'){
        const result = await login(req.query)
        // 设置返回的cookie值。 httpOnly 不允许客户端通过js修改； path=/ 作用于根路径；  expires 设置过期时间。
        res.setHeader('Set-cookie', `username=zhangsan;path=/;httpOnly;expires=${getCookieExpires()};`)
        return !result ? new ErrorModel(result, '登录失败') : new SuccessModel(result, '登录成功')
    }
    if(req.url === '/api/user/login-check-test' && req.method === 'GET'){
        const result = {}
        console.log('req.header', req.headers.cookie)
        req.headers.cookie.split(';').forEach(item => {
            item = item.split('=')
            if(item.length === 0) {
                return new ErrorModel(result, '登录check失败')
            }
            result[item[0].trim()] = item[1].trim()
        })
        console.log('check result', result)
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