var express = require('express');
var router = express.Router();
var skaterBaseUserDal = require('../dal/skaterBaseUser');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.account === undefined) {
    res.render('index');
  }
  else {
    var data = { firstName : req.session.account.firstName };
    res.render('index', data);
  }
});

router.get('/about', function(req, res, next) {
  if(req.session.account === undefined) {
    res.render('about');
  }
  else {
    var data = { firstName : req.session.account.firstName };
    res.render('about', data);
  }
});

router.get('/login', function(req, res) {
  res.render('login.ejs');
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('logout.ejs');
  });
});

router.get('/authenticate', function(req, res) {
  skaterBaseUserDal.GetByEmail(req.query.email, function (err, account) {
    if (err) {
      res.render('login.ejs', { msg: err});
    }
    else if (account == null) {
      res.render('login.ejs', { msg: "User not found."});
    }
    else if (account.password != req.query.password)
      res.render('login.ejs', {msg: "Passwords do not match."});
    else {
      req.session.account = account;
      console.log(account);
      //res.send('Successfully logged in');
      res.render('loggedIn.ejs');

    }
  });
});

router.get('/foundbyoptions', function(req, res){
  skaterBaseUserDal.GetFoundByOptions(function(err,options){
    res.send(options);
  });
});

router.get('/signup', function(req, res){
  res.render('skaterBaseUser/userFormCreate.ejs');
});

router.get('/sessionName', function(req, res){
  if(req.session.account === undefined) {
    res.send(undefined);
  }
  else {
    res.send(req.session.account.firstName);
  }
});

router.get('/save', function(req, res, next) {
//  console.log(req.query);
//  skaterBaseUserDal.Insert(req.query, function(err, result){
//    if (err) {
//      res.send(err);
//    }
//    else {
//      skaterBaseUserDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions,
//          function(err,result) {
//            res.render('dataSaved.ejs');
//          })
//    }
//  });
  res.render('dataSaved.ejs');

});

router.get('/saveUserAjax', function(req, res) {
  console.log(req.query);
  skaterBaseUserDal.Insert(req.query, function(err, result) {
    if (err) {
      var responseData = {success: false, error: err.message};
      res.send(responseData);
    }
    else {
      skaterBaseUserDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions,
          function(err,result) {
            if (err) {
              var responseData = {success: false, error: err.message};
              res.send(responseData);
            }
            var responseData = {success: true};
            res.send(responseData);
            //res.render('dataSaved.ejs');
          })
    }
  });
});

module.exports = router;
