/**
 * Created by LiangLong on 15/10/15.
 */

var router   = require('express').Router();
var url      = require('url');
var crypto   = require('crypto');
var xml2js   = require('xml2js');
var message  = require('./message');

var TOKEN = 'lianglongwx';

/**
 * 验证token签名信息,如果确认是WeiXin服务器发来的消息则返回echostr验证链接,否则返回 undefined阻止下一步操作
 * @param token
 * @returns {boolean}
 * @param req
 */
function checkSignature(token, req) {
    var options = url.parse(req.url, true);
    var query = options.query;

    var signature = query["signature"];
    var timestamp = query["timestamp"];
    var nonce = query["nonce"];
    var echostr = query['echostr'];


    var tmpArray = [token, timestamp, nonce];
    tmpArray.sort();
    var tmpString = tmpArray.join("");

    var sha1Sum = crypto.createHash('sha1');
    sha1Sum.update(tmpString);

    return sha1Sum.digest('hex') == signature ? echostr : undefined;
}

/**
 * 处理get请求,weixin发送的get请求主要是用来验证合法性的
 */
router.get('/', function (req, res, next) {
    var echostr = checkSignature(TOKEN, req);
    if (echostr) {
        res.send(echostr);
    } else {
        res.send('not from WeiXin Server');
    }
});


/**
 * 处理post请求,用来处理用户发送的消息
 */
router.post('/', function (req, res, next) {
    //var echostr = checkSignature(TOKEN, req);
    //if (!echostr) {
    //    res.send('not from WeiXin Server');
    //    return;
    //}
    var postData = "";
    req.on('data', function (chunk) {
        postData += chunk;
    });
    req.on('end', function () {
        console.log(postData);
        xml2js.parseString(postData, {explicitArray : false, ignoreAttrs : true}, function (err, result) {
            console.dir(result.xml);
            message.reply(result.xml, req, res, next);
        });
    });
});

module.exports = router;
