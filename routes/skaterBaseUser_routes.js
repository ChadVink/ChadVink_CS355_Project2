var express = require('express');
var router = express.Router();
var accountDal = require('../dal/skaterBaseUser.js');


router.get('/', function(req, res, next){
    accountDal.GetUser(req.session.account.userID, function(err, result){
        if ( err ) res.send(err);
        accountDal.GetFoundByForUser(req.session.account.userID, function(err, found){
            if ( err ) res.send(err);
            //res.send(result);
            res.render('skaterBaseUser/skaterBaseUser_display', {
                user: result,
                foundby: found,
                firstName: req.session.account.firstName
            });
        });

    });
});


module.exports = router;