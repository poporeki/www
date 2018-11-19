var express=require('express');
var router=express.Router();

var crypto = require('crypto');

var moment=require('moment');

var dbUser=require('../../db/schema/userSchema');
var getClientIP=require('../../modules/getClientIP');
router.post('/postReg', function (req, res) {
    var name=req.body.reg_name;
    var pwd=req.body.reg_pwd;
    var tel=req.body.reg_tel;
    var nowDate=moment().format();
    var userAgent=req.headers['user-agent']||'not';
    var hash = crypto.createHash('md5');
    hash.update(pwd);
    pwd=hash.digest('hex');
    getClientIP(req,function(result){
        if(!result) return;
        var ipinfo=result;
        var xiaoming = new dbUser({
            serialNum:moment().format('YYMMDD')+1,
            username: name,
            password:pwd ,
            telnumber: tel,
            permissions:'normal',
            regTime:nowDate,
            regIP:ipinfo.ip,
            regCountry:ipinfo.country,
            regCountry_id:ipinfo.country_id,
            regCity:ipinfo.city,
            regISP:ipinfo.isp,
            regRegion:ipinfo.region,
            regUserAgent:userAgent
        });
    
        xiaoming.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }   
            res.json({
                name: name,
                password: pwd,
                telnumber: tel,
                permissions:'normal',
                regTime:nowDate
            });
    
            console.log('--------数据已记录-----------');
        });
    })
    
})

module.exports=router;