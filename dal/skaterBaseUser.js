var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetUser = function( userID, callback){
    var query = 'SELECT * FROM skaterBaseUser WHERE userID = ?';
    var queryData = [userID];

    connection.query(query, queryData, function(err, result){
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
};

exports.GetFoundByForUser= function( userID, callback){
    var query = 'SELECT * FROM foundbyForUser WHERE userID = ?';
    var queryData = [userID];

    connection.query(query, queryData, function(err, result){
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
};

exports.GetByEmail = function( email, callback){
    var query = 'CALL skaterBaseUser_GetByEmail(?)';
    var queryData = [email];

    connection.query(query, queryData, function(err, result){
        if (err) {
            callback(err, null);
        }
        else if ( result[0].length == 1){
            callback(err, result[0][0]);
        }
        else{
            callback(err, null);
        }
    })
};

exports.GetFoundByOptions = function(callback){
    connection.query("SELECT * FROM foundby", function(err, result) {
        callback(err, result);
    })
};

exports.GetAccountFoundBy = function(userID, callback) {
    connection.query("SELECT * FROM skaterBaseUser_foundby WHERE userID = ?", [userID],
        function(err, result) {
            callback(err,result);
        });
};

exports.Insert = function(account_info, callback) {

    var dynamic_query = 'INSERT INTO skaterBaseUser (firstName, lastName, email, password, bio) VALUES (' +
        '\'' + account_info.firstName + '\', ' +
        '\'' + account_info.lastName + '\', ' +
        '\'' + account_info.email + '\', ' +
        '\'' + account_info.password + '\', ' +
        '\'' + account_info.bio + '\'' +
        ');';

    console.log(dynamic_query);

    connection.query(dynamic_query, function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.InsertAccountFoundBy = function(account_id, selectedOptions, callback) {
    var query_data = [];
    for(var i = 0 ; i < selectedOptions.length; i++) {
        query_data.push([account_id, selectedOptions[i]]);
    }
    var query = 'INSERT INTO skaterBaseUser_foundby (userID, foundbyID) VALUES ?';
    console.log(query_data);
    connection.query(query, [query_data], function(err, result){
        console.log(result);
        callback(err,result);
    });
};