var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetSkatersForCompany = function(_companyID, callback) {

    var query = 'SELECT * FROM sponcer s JOIN skater sk ON s.skaterID = sk.skaterID WHERE s.companyID = ?';

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

exports.GetCompanyForSkaters = function(_skaterID, callback) {

    var query = 'SELECT * FROM sponcer s JOIN skateCompany sc ON s.companyID = sc.companyID WHERE s.skaterID = ?';

    connection.query(query, _skaterID,
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

exports.Insert = function(_skaterID, _companyID, callback){

    var query = 'INSERT INTO sponcer VALUES(?, ?);';
    var queryData = [_skaterID, _companyID];

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


