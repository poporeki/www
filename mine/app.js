var express=require('express'),
app=express();

app.use(express.static('./'));
app.get('/',function(req,res){
//res.send('index.html');
});


app.listen(8080,function(){
    console.log('server is running');
})