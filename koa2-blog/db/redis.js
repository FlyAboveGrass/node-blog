const { REDIS_CONF } = require('../conf/enviroment')
const redis = require('redis')

// 创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
    console.log('error', err);
})

module.exports = redisClient