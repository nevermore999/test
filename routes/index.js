const express = require('express')
const User = require('../models/user')
const {currentUser} = require('./main')
const Session = require('../models/session')
const Todo = require('../models/todo')
const index = express.Router()
index.get('/', (request, response) => {
    response.render('index/app.html')
})
index.get('/home', (request, response) => {
    response.render('index/home.html')
})
index.post('/login', (request, response) => {
    const form = request.body
    const u = User.findOne('username', form.username)
    if(u.validateAuth(form)) {
        request.session.uid = u.id
        response.cookie('id', u.id)
        const args = {
            user: u,
        }
        response.render('index/home.html', args)
    }else {
        alert('用户名或密码错误')
    }
})
index.post('/register', (request, response) => {
    const form = request.body
    const u = User.register(form)
    response.render('index/home.html')
})
module.exports = index