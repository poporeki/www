var express=require('express');
var router=express.Router();
var SaveTourists=require('../modules/saveTourists');

var ServiceTel=require('./service/telfare');
var Reg=require('./reg');
var Login=require('./login');


router.use('/',function(req,res,next){
    console.log(req.path);
    next();
})

router.get('/',function(req,res,next){
    var user={};
    if(req.session.user){
        user={
            status:true,
            name:req.session.user['name']
        }
    }else{
        user={
            status:false
        }
    }
    SaveTourists(req);
    res.render('index/index',{
        pageTitle:'京东',
        user:user
    });
    console.log('in');
})

router.use(ServiceTel);
router.use(Reg);
router.use(Login);
module.exports=router;