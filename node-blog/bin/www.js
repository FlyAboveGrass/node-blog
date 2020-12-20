const http = require('http')
const serverHandler = require('../app')
require('module-alias/register');
const test = require('@/test');
console.log(test);

const PORT = 3000

const server = http.createServer(serverHandler)

server.listen(PORT, () => {
    console.log('server is run on http://localhost:3000')
})