var express = require('express');
var router = express.Router();
var dbUser = require('../../db/schema/userSchema');

/* 检查用户名 */
router.post('/checkUserName', function (req, res) {
    var getUname = req.body.username;
    dbUser.find({
        username: getUname
    }, function (err, result) {
        if (err) return;
        if (result.length == 0) {
            res.json(true);
        } else {
            res.json(false);
        }

    })

})

module.exports = router;