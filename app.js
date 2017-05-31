const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const secretKey = require('./config')
const fs = require('fs')
const index = require('./routes/index')
const todo = require('./routes/todo')
const music = require('./routes/music')
const weibo = require('./routes/weibo')
const app = express()
app.use(session({
    secret: secretKey,
}))
app.use(cookieParser())
nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})
app.use(bodyParser.urlencoded({
    extended: true,
}))
// 配置静态资源文件, 比如 js css 图片
const asset = __dirname + '/static'
app.use('/static', express.static(asset))
app.use('/', index)
app.use('/todo', todo)
app.use('/music', music)
app.use('/weibo', weibo)
const run = (port=4000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        host = address.address
        port = address.port
        console.log(`listen at http://${host}:${port}`)
    })
}
if (require.main === module) {
    run(4000, '127.0.0.1')
}
module.exports = app
