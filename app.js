const express = require('express')
const app = express()

//art-template模板
app.engine('html', require('express-art-template'))
app.set('view engine', 'html')
app.set('views', './www')



//获取post表单数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
//挂载
app.use('/node_modules',express.static('node_modules'))

//导入router目录的index
const router = require('./router/index.js')
app.use(router)
//导入router目录的user
const router1 = require('./router/user.js')
app.use(router1)

app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
    
})