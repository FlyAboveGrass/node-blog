const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'yangjiajian'

// 加密
function md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password){
    const str = `password = ${password}&key=${SECRET_KEY}`
    return md5(str)
}

console.log(genPassword('1233445'));
console.log(md5('123'));

module.exports = {
    md5,
    genPassword
}