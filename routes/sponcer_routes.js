var express = require('express');
var router = express.Router();
var sponcerDal = require('../dal/sponcer');

router.get('/', function(req, res) {
    var skaterID = req.query.skaterID;

    sponcerDal.GetCompanyForSkaters(skaterID, function (err, Result) {
        if (err) throw err;
        var data = {
            //skater: skaterResult,
            sponcer: Result
        };
        //res.render('skater/skater_display.ejs', data);
    });
});

module.exports = router;