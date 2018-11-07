module.exports = {
    home(req,res){
        res.render('./index.html',{
            user:req.session.user,
            islogin: req.session.islogin,

        })
    }
}