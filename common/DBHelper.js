const sql = require('mssql');
const dbconfig = require('./sysconfig.js');

const config = {
    server: dbconfig.sql_server,
    database: dbconfig.sql_database,
    user: dbconfig.sql_user,
    password: dbconfig.sql_password,
    port: dbconfig.sql_port
};

function DBHelper(){
    this.Query = function(sqlstr,callback){
        const con = new sql.Connection(config);
        con.connect().then(function () {
            const request = new sql.Request(con);
            request.query(sqlstr ,function (err, res){
                con.close();
                if (err) {
                    console.log("Error while querying database :- " + err);
                    callback({iserror:true,result: err});
                   }
                   else {
                    callback({iserror:false,result:res});
                          }
            });
        });
    }
}

module.exports = DBHelper;