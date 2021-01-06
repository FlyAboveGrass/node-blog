const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        // 存放三种类型的中间件
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    // 判断第一个参数是否是string类型的路径，如果没有传入路径默认是根路径下面的中间件
    register(path) {
        const info = {}
        if(typeof(path) === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    // 使用中间件的时候往中间件列表中添加对应中间件
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    // 创建server并监听,简单实现express的listen方法
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }

    // 回调函数
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
            let { url, method } = req
            method = String.prototype.toLowerCase.call(method)

            const resultList = this.match(url, method)
            this.handle(req, res, resultList)
        }
    }

    // 根据url和method查找对应的中间件
    match(url, method) {
        let stack = []
        if(url === '/favicon.ico') {
            return stack
        }

        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach((route) => {
            if(url.indexOf(route.path) === 0) {
                stack = stack.concat(route.stack)
            }
        })

        return stack
    }

    // 执行中间件
    handle(req, res, stack) {
        const next = () => {
            const middleware = stack.shift()
            if(middleware) {
                // 将next传进去，如果中间件中执行next()则继续从stack中获取下一个中间件执行，没有next则退出
                middleware(req, res, next)
            }
        }
        next()
    }

}

// 工厂函数
// 需要使用立即执行函数, 这样在外部运行的时候就可以直接返回一个like-express实例了
module.exports = () => {
    return new LikeExpress()
}