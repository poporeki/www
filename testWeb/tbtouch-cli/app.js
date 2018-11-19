var express=require('express');
var app=express();
var path=require('path');

app.use('/static', express.static(path.join(__dirname,'./static')));
var ejs=require('ejs');
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index');
});

app.listen(4002,function(){
    console.log('server is running');
})