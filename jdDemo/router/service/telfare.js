var express=require('express');
var router=express.Router();

router.get('/service/telfare',function(req,res,next){
    res.render('index/service/telfare',{
        pageTitle:'充值页面'
    });
})

module.exports=router;