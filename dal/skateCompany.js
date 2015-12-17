var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM skateCompany;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(_companyID, callback) {

    var query = 'SELECT * FROM skateCompany WHERE companyID = ?';

    connection.query(query, _companyID,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.Insert = function(info, callback){
    console.log(info.companyName);
    var queryData = [info.companyName, info.founder, info.foundDate];
    var query = 'INSERT INTO skateCompany(companyName, founder, foundDate) VALUES (?, ?, ?);';
    connection.query(query, queryData,
        function (err, result){
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
}