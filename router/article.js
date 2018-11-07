const express = require('express')
const router = express.Router()

const  Article =require('../controller/article.js')
//点击文章页面
router.get('/article/add',Article.articleGet)
//完成文章提交
router.post('/article/add',Article.articlePost)

module.exports = router