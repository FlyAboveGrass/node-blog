const http = require('http')
const serverHandler = require('../app')

const PORT = 3000

const server = http.createServer(serverHandler)

server.listen(PORT, () => {
    console.log('server is run on http://localhost:3000')
})