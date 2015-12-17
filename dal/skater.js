var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM skater;',
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

exports.GetByID = function(_skaterID, callback) {

    var query = 'SELECT * FROM skater WHERE skaterID = ?';

    connection.query(query, _skaterID,
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
}

exports.GetByName = function(firstName, lastName, callback) {
    var query = 'SELECT * FROM skater WHERE firstName = ? AND lastName = ?';
    var queryData = [firstName, lastName];
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
}

exports.Insert = function(info, callback){
    //console.log(info.companyName);
    var queryData = [info.firstName, info.lastName, info.sponcerStatus, info.age];
    var query = 'INSERT INTO skater(firstName, lastName, sponcerStatus, age) VALUES (?, ?, ?, ?);';
    connection.query(query, queryData,
        function (err, result){
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //console.log(result);
            callback(false, result);
        });
}