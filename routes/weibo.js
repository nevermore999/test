const { log, error } = require('../utils')
const User = require('../models/user')
const Weibo = require('../models/weibo')
const Comment = require('../models/comment')
const express = require('express')
const {currentUser} = require('./main')
const weibo = express.Router()
weibo.get('/', (request, response) => {
    const id = Number(request.cookies.id)
    const u = User.get(id)
    const allweibos = Weibo.all()
    const weibos = Weibo.find('user_id', u.id)
    const args = {
        weibos: weibos,
        user:u,
        allweibos: allweibos
    }
    response.render('weibo/test.html', args)
})
weibo.get('/new', (request, response) => {
    response.render('weibo/weibo_new.html')
})
weibo.post('/add', (request, response) => {
    const id = Number(request.cookies.id)
    const u = User.get(id)
    const form = request.body
    const w = Weibo.create(form)
    w.user_id = u.id
    w.username = u.username
    w.save()
    response.redirect('/weibo')
})
weibo.get('/delete', (request, response) => {
    const id = Number(request.query.id)
    Weibo.remove(id)
    response.redirect('/weibo')
})
weibo.get('/edit', (request, response) => {
    response.render('weibo/weibo_edit.html')
})
weibo.post('/update', (request, response) => {
    const id = Number(request.cookies.id)
    const w = Weibo.findOne('user_id', id)
    const form = request.body
    w.content = form.content
    w.save()
    response.redirect('/weibo')
})
weibo.post('/comment', (request, response) => {
    const id = Number(request.cookies.id)
    const form = request.body
    const c = Comment.create(form)
    c.user_id = id
    c.save()
    response.redirect('/weibo')
})
weibo.get('/comment/del', (request, response) => {
    "use strict";
    const id = Number(request.query.id)
    Comment.remove(id)
    response.redirect('/weibo')
})

module.exports = weibo