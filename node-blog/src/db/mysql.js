const mysql = require('mysql')

const { MYSQL_CONF } = require('@/conf/enviroment')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

const exec = (sql) => {
    return new Promise((resolve, reject) => {
        try {
            con.query(sql, (err, result) => {
                if(err) {
                    reject(err)
                }
                resolve(result)
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
