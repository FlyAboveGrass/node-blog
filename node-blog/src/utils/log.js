const path = require('path')
const fs = require('fs')

function createWriteStream(logName) {
    const fullPath = path.join(__dirname, '../', '../', 'log', logName)
    return fs.createWriteStream(fullPath, {
        flags: 'a'
    })
}

// 写入log
function access(logName, log) {
    const writeStream = createWriteStream(logName)
    writeStream.write(log + '\n')
}

module.exports = access