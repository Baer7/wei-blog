const moment = require('moment')
const conn = require('../db/db.js')
module.exports={
    //进入文章
    articleGet(req,res){
        //如果没有登录跳转回主页面
        if (!req.session.islogin) return res.redirect('/')
        //设置cookie过期时间
        req.session.cookie.expires = new Date(Date.now() + 1000*60*60*24*30)
        //渲染页面
        res.render('../www/article/article.html',{
            user:req.session.user,
            islogin: req.session.islogin,
        })
    },
    //发表文章
    articlePost(req,res){
        // console.log(req.body)
        const info =req.body
        info.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(info);
        const sql = 'insert into articles set ?'
        conn.query(sql,info,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'文章存储不成功'})
            // console.log(result)
            if(result.affectedRows!==1)return res.status(500).send({status:500,msg:'文章存储失败'})
            res.send({status:200,msg:'存储成功',id:result.insertId})
        })
        
    }
}