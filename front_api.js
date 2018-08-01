var express = require('express');
var crypto = require('crypto');
var sysconfig = require('./sysconfig');
var DBHelper = require('./DBHelper');
var app =express();
var bodyParser = require("body-parser");

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get("/",function(req,res){
    res.send({status:"welcome to our api"});
});

app.get('/hash/:txt', function(req, res) {
    var hash = crypto.createHmac('sha256', sysconfig.hashkey)
                   .update(req.params.txt)
                   .digest('hex');
    res.send({cypher: hash});
});

app.get('/users/:userid', function(req, res) {
  
    var dbhel = new DBHelper();

    dbhel.Query("select * from emp_mas where emp_key='"+req.params.userid+"'",function(result){
        res.send(JSON.stringify(result));            
  });
});

app.post('/authenticated', function(req, res) {
    
    console.log('user :'+req.body.userid);
    //console.log('pwd :'+req.body.password);

    res.send({status:"post"});
 
});



app.listen(sysconfig.apiserver_port);
console.log("Start API port : "+sysconfig.apiserver_port);