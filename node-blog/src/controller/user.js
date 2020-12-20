const { exec } = require("@/db/mysql")

const login = (req) => {
    const { username, password } = req
    const sql = `select username,password,realname from users where username = '${username}' and password = '${password}'`
    return exec(sql).then(rows => {
        return rows[0] || null
    })
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