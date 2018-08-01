var sql = require('mssql');
var dbconfig = require('./sysconfig.js');

var config = {
    server: dbconfig.sql_server,
    database: dbconfig.sql_database,
    user: dbconfig.sql_user,
    password: dbconfig.sql_password,
    port: dbconfig.sql_port
};

function DBHelper(){
    this.Query = function(sqlstr,callback){
        var con = new sql.Connection(config);
        con.connect().then(function () {
            var request = new sql.Request(con);
            request.query(sqlstr).then(function (recordSet) {
                con.close();
                callback(recordSet);
            });
        });
    }
}

module.exports = DBHelper;