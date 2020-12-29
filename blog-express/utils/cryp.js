const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'yangjiajian'

function md5(content) {
    const md5 = crypto.createHash('md5')
    md5.update(content).digest('hex')
}

function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}