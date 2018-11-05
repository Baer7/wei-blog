const express = require('express')
const app = express()

//art-template模板
app.engine('html', require('express-art-template'))
app.set('view engine', 'html')
app.set('views', './www')

//数据库
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'blog'
})
//获取时间
const moment = require('moment')

//获取post表单数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
//挂载
app.use('/node_modules',express.static('node_modules'))

app.get('/',(req,res)=>{
    res.render('./index.html',{})
})

//注册登录
app.get('/register',(req,res)=>{
    res.render('./user/register.html')
})
app.get('/login',(req,res)=>{
    res.render('./user/login.html')
})
 
//注册处理
app.post('/register',(req,res)=>{
  const user = req.body
  //验证
  if (user.username.trim().length <= 0 || user.password.trim().length <= 0 || user.nickname.trim().length <= 0) {
      return res.status(500).send({status:500,msg:'请填写完整的表单'})
  }
  const sql1 = 'select count(*) as count from users where username=?'
  conn.query(sql1,user.username,(err,result)=>{
      if(err)return res.status(501).send({ msg: '用户名查重失败！', status: 501 })
      console.log(result);
      if(result[0].count !==0) return res.status(502).send({ msg: '用户名已存在！', status: 502 })
   //执行注册
   const sql2 = 'insert into users set ?'
   user.ctime =moment().format('YYYY-MM-DD HH:mm:ss')
   conn.query(sql2,user,(err,result)=>{
    if(err)return res.status(503).send({ msg: '注册新用户失败', status: 503 })
    if (result.affectedRows !== 1) return res.status(503).send({ msg: '注册新用户失败！', status: 503 })
    res.send({status:200,msg:'注册成功'})
   })
  })
  
})
//登录处理
app.post('/login',(req,res)=>{
    const user = req.body
    
    
    const sql = 'select * from users where username=? and password=?'
    conn.query(sql,[user.username,user.password],(err,result)=>{
        if (err) return res.status(501).send({ msg: '用户登录失败', status: 501 })  
        if(result.length!==1) return res.status(501).send({ msg: '用户登录失败', status: 501 })  
        res.send({status:200,msg:'登录成功'})
    })
    
})

app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
    
})