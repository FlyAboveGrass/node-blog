const handleUserRouter = (req, res) => {
    if(req.url === '/user' && req.method === 'GET'){
        return {'user': '获user取博客'}
    }
}

module.exports = handleUserRouter