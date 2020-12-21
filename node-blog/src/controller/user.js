const { exec } = require("@/db/mysql")
const { setRedis } = require("@/db/redis")

const login = async (req) => {
    const { username, password } = req
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