var schema = require('../db/schema/addTourists');
var getClientIP = require('./getClientIP');
var moment = require('moment');

function saves(req) {
    var getIPinfo;
    getClientIP(req, function (result) {
        getIPinfo = result;
        var hisIP = getIPinfo.ip;
        console.log('返回的'+getIPinfo);
        var userAgent = req.headers['user-agent'] || 'not';
        var host = req.headers['host'] || 'not';
        schema.find({
            regIP: hisIP,
            regUserAgent: userAgent
        }, function (err, result) {
            if (err) return;
            var len = result.length;
            if (len != 0) {
                schema.update({
                    regIP: hisIP
                }, {
                    $push: {
                        comeinTime: moment().format(),
                        host: host
                    }
                }, function (err, result) {
                    if (err) return;
                    console.log('--------数据已更新-----------' + 'is TOURIISTS!');
                    return;
                })
            } else {
                var tourists = new schema({
                    permissions: 'Tourists',
                    regIP: hisIP,
                    isp: getIPinfo.isp,
                    country: getIPinfo.country,
                    country_id: getIPinfo.country_id,
                    city: getIPinfo.city,
                    region: getIPinfo.region,
                    regUserAgent: userAgent,
                    comeinTime: moment().format(),
                    host: host
                })
                tourists.save(function (err) {
                    if (err) return;
                     console.log('--------数据已记录-----------' + 'is TOURIISTS!');
                     return;
                });
            }

        })
    });



}
module.exports = saves;