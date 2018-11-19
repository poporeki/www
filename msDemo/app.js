var express=require('express');
var app=express();
var path=require('path');

var PORT=4003;
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'./public')));
app.get('/',function(req,res){
    res.render('index');
})

app.listen(PORT,function(){
    console.log('server is running');
})