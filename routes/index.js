var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title : 'Express'});
    //test_xml2js(res);
});


function test_xml2js(res) {
    var testJson = {
        toUsername   : "hehehda",
        fromUsername : "hahahada",
        createTime   : "",
        msgType      : 'text',
        content      : "heheheheheheheh"
    };

    var fs = require('fs');
    var xml2js = require('xml2js');
    var ejs = require('ejs');

    var text = fs.readFileSync("./views/template.ejs", "utf-8");
    var tttt = ejs.render(text, testJson);
    res.send(tttt);
}

module.exports = router;
