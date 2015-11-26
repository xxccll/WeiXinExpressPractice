var express = require('express');
var router = express.Router();
var message = require("./lianglong/message");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title : 'Express'});
    //test_xml2js(req, res, next);
});


function test_xml2js(req, res, next) {
    var testJson = {
        ToUserName   : "hehehda",
        FromUserName : "hahahada",
        CreateTime   : "111",
        MsgType      : 'text',
        Content      : "heheheheheheheh"
    };
    message.reply(testJson, req, res, next);
}

module.exports = router;
