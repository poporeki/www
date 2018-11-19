var express = require('express');
var router = express.Router();
var drawCap=require('../modules/drawCap');

var Checks=require('./verify');
var PostReg=require('./post/reg');
var RefreshCaptcha=require('./post/refreshCaptcha');

router.get('/reg', function (req, res) {
    var createCaptcha=drawCap();
    req.session.captcha=(createCaptcha.str).toLowerCase();
    res.render('reg', {
        titPage: '注册',
        drawCap:createCaptcha.dataUrl
    });
})

router.use(Checks);
router.use(PostReg);
router.use(RefreshCaptcha);
module.exports = router;