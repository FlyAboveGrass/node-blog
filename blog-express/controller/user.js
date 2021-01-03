const { exec } = require('../db/mysql')

const queryUser = (username, password) => {
    const sql = 'SELECT id,username,realname FROM `users` WHERE `username` = ? and `password` = ?'
    const fileds = [username, password]
    return exec(sql, fileds).then(rows => rows[0])
}

module.exports = {
    queryUser
}