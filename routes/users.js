var express = require('express');
var router = express.Router();
var accountDal = require('../dal/skaterBaseUser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/save', function(req, res, next) {
  console.log(req.query);

  accountDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      accountDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions, function(err,result) {
        res.render('dataSaved.ejs');
      })
    }
  });
});

module.exports = router;
