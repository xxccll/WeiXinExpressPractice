/**
 * Created by LiangLong on 15/11/29.
 */
var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var http = require("http");
var url = require('url');
var crypto = require('crypto');

const TOKEN = 'lianglongwx';

/**
 * 验证token签名信息,如果确认是WeiXin服务器发来的消息则返回echostr验证链接,否则返回 undefined阻止下一步操作
 * @returns {boolean}
 * @param req
 * @param res
 * @param next
 */
function checkSignature(req, res, next) {
    var options = url.parse(req.url, true);
    var query = options.query;

    var signature = query["signature"];
    var timestamp = query["timestamp"];
    var nonce = query["nonce"];
    var echostr = query['echostr'];

    var tmpArray = [TOKEN, timestamp, nonce];
    tmpArray.sort();
    var tmpString = tmpArray.join("");

    var sha1Sum = crypto.createHash('sha1');
    sha1Sum.update(tmpString);

    echostr = sha1Sum.digest('hex') == signature ? echostr : undefined;

    if (echostr) {
        res.send(echostr);
    } else {
        res.send('not from WeiXin Server');
    }
}


var template = null;

/**
 * @returns {*} 获取模板字符串
 */
function getTemplate() {
    if (!template) {
        template = fs.readFileSync("./views/template.ejs", "utf-8");
    }
    return template;
}

/**
 * 回复消息
 * @param msg
 * @param req
 * @param res
 * @param next
 */
function reply(msg, req, res, next) {
    var content = getContent(msg);
    var response = ejs.render(getTemplate(), content);
    res.send(response);
}


/**
 *
 * @param msg   根据消息得到返回的内容
 */
function getContent(msg) {
    var obj = {
        toUsername   : msg.FromUserName,
        fromUsername : msg.ToUserName,
        createTime   : new Date().getTime(),
        msgType      : "text",
        content      : "测试"
    };
    switch (msg.MsgType) {
        case 'text':
            break;
        case 'image':
            break;
        case 'voice':
            break;
        case 'video':
            break;
        case 'shortvideo':
            break;
        case 'location':
            break;
        case 'link':
            break;
        case 'event':
            break;
    }
    return obj;
}

function getWeather(city, callback) {
    var cityEncode = encodeURIComponent(city);
    console.log(cityEncode);

    var param = {
        city   : cityEncode,
        appkey : "trialuser"
    };
    var options = {
        method   : "GET",
        host     : 'apix.sinaapp.com',
        path     : "/weather/" + "?" + qs.stringify(param)
    };

    http.request(options, function (res) {
        var body = "";
        res.on('data', function (chunk) {
            body += chunk
        });
        res.on('end', function () {
            callback(body)
        });
    }).end();
}

exports.checkSignature = checkSignature;
exports.reply = reply;
exports.getWeather = getWeather;
