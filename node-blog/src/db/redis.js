const { REDIS_CONF } = require('@/conf/enviroment')
const redis = require('redis')


const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

const getRedis = (key) => {
    return new Promise((resolve, reject) => {
        if(!key) {
            reject(null)
            return 
        }
        redisClient.get(key, (err ,data) => {
            if(err){
                reject(err)
            }

            // 考虑data是简单值或者对象的形式
            try {
                resolve(JSON.parse(data))
            } catch (e) {
                resolve(data)
            }
        })
    })
}

const setRedis = (key, val) => {
    redisClient.set(key, JSON.stringify(val))
}

module.exports = {
    getRedis,
    setRedis
}