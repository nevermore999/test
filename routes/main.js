const User = require('../models/user')

const { log } = require('../utils')

const currentUser = (request) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    console.log('debug session 1', request.session.uid)
    const uid = request.session.uid || ''
    const u = User.findOne('id', uid)
    if (u === null) {
        // 如果当前没有用户登录, 造一个占位的用户
        // 这样我们处理会非常方便,
        // 比如显示用户名就直接用 u.username
        // 而不需要 u !== null && u.username
        const fakeUser = {
            id: -1,
            username: '游客',
        }
        return fakeUser
    } else {
        return u
    }
}

module.exports = {
    currentUser: currentUser,
}
