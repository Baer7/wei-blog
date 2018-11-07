const express = require('express')
const router =express.Router()

//导入index处理函数
const  Home =require('../controller/index.js')

router.get('/',Home.home)

module.exports = router