var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    'serialNum': Number,
    'username': String,
    'password': String,
    'telnumber': Number,
    'regTime': Date,
    'permissions': String,
    'regIP': String,
    'regCountry': String,
    'regCountry_id': String,
    'regCity': String,
    'regISP': String,
    'regRegion': String,
    'regUserAgent': String,
    'loginTime': []
});
var User = mongoose.model('testuser', userSchema);

module.exports = User;