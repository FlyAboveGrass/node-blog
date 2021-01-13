const { ErrorModel } = require('@/model/resModel')

const loginCheck = async (ctx, next) => {   
    console.log('file: loginCheck.js ~ line 4 ~ loginCheck ~ ctx.SESSION', ctx.session);
    if(ctx.session.username) {
        await next()
        return 
    }
    
    ctx.body = new ErrorModel(null, '尚未登录')
}

module.exports = loginCheck