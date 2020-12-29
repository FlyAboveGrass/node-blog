const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/enviroment')

const con = mysql.createConnection(MYSQL_CONF)

function exec(sql, fileds) {
    return new Promise((resolve, reject) => {
        try {
            con.query(sql, fileds, function (error, data, fields) {
                if(error) {
                    reject(error)
                }
                console.log(data, fields);
                resolve(data)
            });
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    exec
}