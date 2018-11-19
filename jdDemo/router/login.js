var express=require('express');
var router=express.Router();

router.get('/login',function(req,res){
    if(req.session.user){
        res.redirect('/');
    }
    res.render('login',{
        pageTitle:'登陆'
    })
})
router.post('/login',require('./post/login'));
module.exports=router;