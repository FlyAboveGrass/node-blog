const { exec } = require('../db/mysql')

const queryUser = async (username, password) => {
    const sql = 'SELECT id,username,realname FROM `users` WHERE `username` = ? and `password` = ?'
    const fileds = [username, password]

    const rows = await exec(sql, fileds)
    return rows.length > 0 ? rows[0] : null
}

module.exports = {
    queryUser
}