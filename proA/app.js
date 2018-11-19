var express=require('express'),
    app=express();
    path=require('path');

app.set('views',path.normalize(__dirname+'/views'));
app.set('view engine','ejs');
app.use(express.static(path.normalize(__dirname+'/')));
app.get('/',function(req,res){
    res.render('index',{});
});
app.get('/login',function(req,res){
    res.render('login');
});
app.get('/demo_falsh',function(req,res){
    res.render('demo_falsh.ejs');
});
app.listen(80);