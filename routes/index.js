var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title : "Express"});

    var file = require('fs').readFileSync("README.md", "utf-8");
    var content = require('marked')(file);
    //res.send(content);
    res.render('markdown', {content : content});
});

module.exports = router;
