const { exec } = require('../db/mysql')

const queryUser = (username, password) => {
    const sql = 'SELECT * FROM `users` WHERE `username` = ? and `password` = ?'
    const fileds = [username, password]
    console.log('file: user.js ~ line 6 ~ queryUser ~ fileds', sql, fileds);
    return exec(sql, fileds)
}

module.exports = {
    queryUser
}