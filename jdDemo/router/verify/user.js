var express = require('express');
var router = express.Router();
var dbUser = require('../../db/schema/userSchema');


router.post('/ajax', function (req, res) {
    var getUname = req.body.username;
    dbUser.find({
        username: getUname
    }, function (err, result) {
        if (err) return;
        if (result.length == 0) {
            res.json({
                status: true
            });
        } else {
            res.json({
                status: false
            });
        }

    })
    // fs.readFile('./public/data/username.json', 'utf-8', function (err, data) {

    //     if (err) return console.log(err);
    //     var data = JSON.parse(data);
    //     var aa = data.username[getUname];
    //     console.log(aa);
    //     if (data.username[getUname]) {
    //         res.json({
    //             status: true
    //         });
    //     } else {
    //         res.json({
    //             status: false
    //         });
    //     }
    // })


})

module.exports = router;