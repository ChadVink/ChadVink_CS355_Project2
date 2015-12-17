var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM videoCompany;',
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

exports.GetByName = function(videoName, companyID, callback) {

    var query = 'SELECT * FROM GetSkatersInVideo WHERE videoName = ? AND companyID = ?';
    var queryData = [videoName, companyID];
    connection.query(query, queryData,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //console.log(result);
            callback(false, result);
        }
    );
};


exports.GetVideosForCompany = function(companyID, callback){
    var queryData = [companyID];
    var query = 'SELECT * FROM GetVideosForCompany WHERE companyID = ?';
    connection.query(query, queryData,
        function(err, result){
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //console.log(result);
            callback(false, result);

        });
};

exports.GetVideosForSkaters = function(skater, callback){
    var queryData = [skater.firstName, skater.lastName];
    var query = 'SELECT * FROM GetVideosForSkaters WHERE firstName = ? AND lastName = ?';
    connection.query(query, queryData,
        function(err, result){
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //console.log(result);
            callback(false, result);
        });
};