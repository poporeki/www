var express=require('express');
var router=express.Router();
var drawCap=require('../../modules/drawCap');

router.post('/refreshCaptcha',function(req,res){
    var result=drawCap();
    req.session.captcha=(result.str).toLowerCase();
    res.json(result.dataUrl);
})

module.exports=router;