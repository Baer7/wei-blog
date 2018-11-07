const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const session = require('express-session')

//session
app.use(session({
    secret: 'bei', //相当于是一个加密密钥,值可以是任意字符串
    resave: false, //强制session保存到session store中
    saveUninitialized: false //强制没有"初始化"的session保存到storage
    
  }))


//art-template模板
app.engine('html', require('express-art-template'))
app.set('view engine', 'html')
app.set('views', './www')



//获取post表单数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
//挂载
app.use('/node_modules',express.static('node_modules'))


//读取router文件夹里的文件
fs.readdir(path.join(__dirname,'./router'),(err,result)=>{
    if(err)return console.log('读取router文件夹失败')
    // console.log(result);
    //循环导入路由
    result.forEach(item =>{
        const router = require(path.join(__dirname,'./router',item))
        app.use(router)   
    })
    
})

app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
    
})