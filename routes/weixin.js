/**
 * Created by LiangLong on 15/11/29.
 */
var router   = require('express').Router();
var xml2js   = require('xml2js');
var message  = require('../modules/weixin/message');

/**
 * 处理get请求,weixin发送的get请求主要是用来验证合法性的
 */
router.get('/', message.checkSignature);


/**
 * 处理post请求,用来处理用户发送的消息
 */
router.post('/', function (req, res, next) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        xml2js.parseString(body, {explicitArray : false, ignoreAttrs : true}, function (err, result) {
            message.reply(result.xml, req, res, next);
        });
    });
});

module.exports = router;
