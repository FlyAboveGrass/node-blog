const { exec, escape } = require("@/db/mysql")
const { setRedis } = require("@/db/redis")
const { md5 } = require("@/utils/cryp")

const login = async (req) => {
    const { username, password } = req
    
    username = escape(username) // 防止sql注入攻击

    // 要先加密，然后再给password标注
    password = md5(password) // md5加密
    password = escape(password)
    const sql = `select id,username,password,realname from users where username = '${username}' and password = '${password}'`
    const user = await exec(sql).catch(err => [])
    if(user.length !== 0) {
        // 将登录信息设置到redis中
        setRedis(user[0].id, user[0])
        return user[0]
    }
    return null
}

const registry = (req) => {
    const { username, password, realname = '' } = req
    if(username && password) {
        const sql = `insert into users(username, password, realname) values('${username}', '${password}', '${realname}')`
        return exec(sql)
    }
    return Promise.resolve(null)
}

module.exports = {
    login,
    registry
}