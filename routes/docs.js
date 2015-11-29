/**
 * Created by LiangLong on 15/11/27.
 */
var router = require('express').Router();
var url = require('url');
var fs = require('fs');

router.get('/', function (req, res, next) {
    var name = url.parse(req.url, true).query['doc'];
    var html = renderMarkDown(name + ".md");
    res.render("markdown", {content : html});
});

function renderMarkDown(fileName) {
    var file = fs.readFileSync(fileName, "utf-8");
    var page = require('marked')(file);
    return page;
}

module.exports = router;
