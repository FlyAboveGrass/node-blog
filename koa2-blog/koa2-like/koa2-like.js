const http = require('http')

// 组合中间件（koa2中next的核心机制）
// 1.传入的是中间件列表
// 2.执行时的参数是ctx
// 3.从第一个中间件开始，遇到next（） 会一直往下执行
// 4.每一个中间件都要支持async，即必须返回一个promise
function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            const middleware = middlewareList[i]
            try {
                // 因为要一直支持es6的async语法，所以所有的中间件都必须是一个promise
                return Promise.resolve(
                    middleware(ctx, dispatch.bind(null, i + 1))
                )
            } catch(e) {
                return Promise.reject(e)
            }
        }
        dispatch(0)
    }
}

class LikeKoa2 {
    constructor() {
        this.middlewareList = []
    }

    use(middleware) {
        this.middlewareList.push(middleware)
        return this; // 中间件链式调用
    }

    // 创建server
    listen() {
        const server = http.createServer(this.callback())
        server.listen(...arguments)
    }
    // server回调函数
    callback() {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            let ctx = this.createContext(req, res)  
            fn(ctx)
        }
    }

    // 将req和res组装到ctx中
    createContext(req, res){
        let ctx = null;
        ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx;
    }
}

module.exports = LikeKoa2