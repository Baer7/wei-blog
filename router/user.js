const express = require('express')
const router =express.Router()


//导入user处理函数
const  User =require('../controller/user.js')



//注册
router.get('/register',User.registerGet)
//登录
router.get('/login',User.loginGet)
 
//注册处理
router.post('/register',User.registerPost)
//登录处理
router.post('/login',User.loginPost)
//注销处理
router.get('/logout',User.logoutGet)

module.exports =router