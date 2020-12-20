const http = require('http')
require('module-alias/register'); // 这是路径别名模块的导入,一定要放在其他自定义模块之前
const serverHandler = require('../app')


const PORT = 3000

const server = http.createServer(serverHandler)

server.listen(PORT, () => {
    console.log('server is run on http://localhost:3000')
})