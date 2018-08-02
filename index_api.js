const express = require('express');
const sysconfig = require('./common/sysconfig');
const app =express();
const bodyParser = require("body-parser");

//---------- api------------------------------------
const authenapi = require('./authen/authen_api');
const commonapi= require('./common/common_api');

//--------------------------------------------------

//=============================================================

app.use(bodyParser.json()); 

app.use( (req, res, next) => {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
//------------- apis edit here----------------------------------
//==============================================================
app.use('/authen', authenapi);
app.use('/common',commonapi);

//--------------------------------------------------------------

app.get("/",(req,res) => {
    res.send({status:"welcome to our api"});
});


app.listen(sysconfig.apiserver_port);
console.log("Start Cero API port : "+sysconfig.apiserver_port);