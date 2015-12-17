var express = require('express');
var router = express.Router();
var skaterDal = require('../dal/skater.js');
var skateCompanyDal = require('../dal/skateCompany.js');
var sponcerDal = require('../dal/sponcer.js');

router.get('/', function(req, res) {
    var skaterID = req.query.skaterID;

    skaterDal.GetByID(skaterID, function (err, skaterResult) {
            if (err) throw err;
            sponcerDal.GetCompanyForSkaters(skaterID, function (err, Result) {
                if (err) throw err;
                var data = {
                    skater: skaterResult,
                    sponcer: Result
                };
                console.log(data);
                res.render('skater/skater_display.ejs', {data: data, firstName : req.session.account.firstName});
            })
        }
    );
});
router.get('/all', function(req, res) {
    skaterDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('skater/skater_all.ejs', {rs: result, firstName : req.session.account.firstName});
        }
    );
});

router.get('/create', function(req, res, next) {
    skateCompanyDal.GetAll(function(err, result) {
        res.render('skater/skater_create', {skateCompany : result, firstName : req.session.account.firstName});
    });
});

router.get('/save', function(req,res, next) {

    console.log("mark 1: ", req.query.skater.firstName);
    console.log(req.query.skater.lastName);

    console.log(req.query.sponcer);

    skaterDal.Insert(req.query.skater, function(err, result) {
        if (err) {
            res.send(err);
        }
        else{
            if ( req.query.sponcer.length > 0) {
                skaterDal.GetByName(req.query.skater.firstName, req.query.skater.lastName, function (err, skater) {
                    if (err) throw err;
                    else {
                        for (var i = 0; i < req.query.sponcer.length; i++) {

                            console.log(skater[0].skaterID);
                            console.log(req.query.sponcer[i], i);
                            sponcerDal.Insert(skater[0].skaterID, req.query.sponcer[i], function (err, result) {
                                if (err) throw err;
                                else {
                                    console.log(skater[0].skaterID, parseInt(req.query.sponcer[i]));
                                    //res.send("Saved");
                                    return;
                                }

                            });
                        }
                        res.render('dataSaved', {firstName : req.session.account.firstName});
                    }
                });
            }
        }

    });

});


module.exports = router;