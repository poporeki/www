var express = require('express'),
    app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());
var PORT = 3001;
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view options', {
    debug: true
})
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60 * 1000
    },
    resave: true,
    saveUninitialized: false
}));

app.set('view engine', 'jade');
var db = require('./db/config');

app.use('/', require('./router/index'));

app.get('*', function (req, res) {
    res.render('404', {});
})
app.post('*', function (req, res) {
    res.render('error');
})

app.listen(PORT, function () {
    console.log('server is running in' + PORT);
})

module.exports = PORT;