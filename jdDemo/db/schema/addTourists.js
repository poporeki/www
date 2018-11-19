var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    'permissions':String,
    'regIP':String,
    'country':String,
    'country_id':String,
    'region':String,
    'city':String,
    'isp':String,
    'regUserAgent':String,
    'comeinTime':[],
    'host':[]
});
var User=mongoose.model('touristsTB',userSchema);

module.exports=User;