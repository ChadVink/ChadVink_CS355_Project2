var express = require('express');
var router = express.Router();
var videoDal = require('../dal/video');

// finish this
router.get('/', function(req, res) {
    var company_id = req.query.companyID;
    var videoName = req.query.videoName;

    videoDal.GetByName( videoName, company_id, function (err, result) {
        if (err) throw err;
        else {
            res.render('video/video_display', {data: result, firstName: req.session.account.firstName});
        }
    });
});

router.get('/all', function(req, res) {
    videoDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('video/video_all', {rs: result, firstName : req.session.account.firstName});
        }
    );
});




module.exports = router;