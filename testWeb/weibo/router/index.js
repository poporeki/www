var express=require('express');
var router=express.Router();

var navLeft=[
    {'title':'热门','link':'/','icon':'icon-home'},
    {'title':'头条','link':'/','icon':'icon-home'},
    {'title':'视频','link':'/','icon':'icon-home'},
    {'title':'新鲜事','link':'/','icon':'icon-home'},
    {'title':'榜单','link':'/','icon':'icon-home'},
    {'title':'搞笑','link':'/','icon':'icon-home'},
    {'title':'社会','link':'/','icon':'icon-home'},
    {'title':'时尚','link':'/','icon':'icon-home'},
    {'title':'军事','link':'/','icon':'icon-home'},
    {'title':'美女','link':'/','icon':'icon-home'},
    {'title':'体育','link':'/','icon':'icon-home'},
    {'title':'动漫','link':'/','icon':'icon-home'},
]
router.get('/',function(req,res){
    res.render('index',{
        navLeftDatas:navLeft
    });
});

module.exports=router;