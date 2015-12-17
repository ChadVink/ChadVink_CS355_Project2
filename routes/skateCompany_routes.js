var express = require('express');
var router = express.Router();
var skateCompanyDal = require('../dal/skateCompany');
var sponcerDal = require('../dal/sponcer');


router.get('/', function(req, res) {
    var company_id = req.query.companyID;

    skateCompanyDal.GetByID(company_id, function (err, companyResult) {
        if (err) throw err;
        sponcerDal.GetSkatersForCompany(company_id, function (err, sponcerResult) {
            if (err) throw err;
            var data = {
                company: companyResult,
                sponcer: sponcerResult
            };
            console.log(data);
            res.render('skateCompany/skateCompany_display', {data: data, firstName : req.session.account.firstName});
        });
    });
});

router.get('/all', function(req, res) {
    skateCompanyDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('skateCompany/skateCompany_all', {rs: result, firstName : req.session.account.firstName});
        }
    );
});

router.get('/create', function(req, res, next) {
    skateCompanyDal.GetAll(function(err, result) {
        res.render('skateCompany/skateCompany_create', {company : result, firstName : req.session.account.firstName});
    });
});

router.get('/save', function(req,res, next) {
    //console.log("Name equals: " + req.query.founder);
    skateCompanyDal.Insert(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            //res.send("Successfully saved the data.");
            res.render('dataSaved', {firstName : req.session.account.firstName});
        }
    });
});



module.exports = router;