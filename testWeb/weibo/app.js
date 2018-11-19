var express=require('express');
var app=express();
var path=require('path');

app.use(express.static(path.join(__dirname,'./public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use('/',require('./router'));
app.use('*',function(req,res){
    res.end('E');
})
var PORT=4004;
app.listen(PORT,function(){
    console.log('running:port'+PORT);
});

module.exports=PORT;