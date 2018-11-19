var express=require('express');
var router=express.Router();

router.post('/checkCaptcha',require('./checkCaptcha'));
router.post('/checkUserName',require('./checkUserName'));

module.exports=router;