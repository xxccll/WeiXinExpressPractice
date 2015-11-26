/**
 * Created by LiangLong on 15/11/25.
 */

var fs = require('fs');
var ejs = require('ejs');

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





exports.reply = reply;
