var express=require('express');
var dbUser=require('../../db/schema/userSchema');
var crypto=require('crypto');
var moment=require('moment');
function login(req,res){
    var username=req.body.uname;
    var pwd=req.body.pwd;
    var hash=crypto.createHash('MD5');
    hash.update(pwd);
    dbUser.find({
        username:username,
        password:hash.digest('hex')
    },function(err,result){
        if(err)return;
        if(result.length==0){
            res.json(false);
            return;
        }
        req.session.user={'name':username};
        dbUser.update({username:username},{$push:{loginTime:moment().format()}},function(err,result){
            if(err) console.log(err);
            console.log("登录时间"+result);
        });
        res.json(true);
    })
}

module.exports=login;