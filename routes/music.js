/**
 * Created by Administrator on 2017/5/31.
 */
const express = require('express')
const {currentUser} = require('./main')
const music = express.Router()
music.get('/', (request, response) => {
    response.render('music/index.html')
})
module.exports = music