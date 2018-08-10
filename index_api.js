const express = require('express');
const sysconfig = require('./common/sysconfig');
const app =express();
const bodyParser = require("body-parser");

//---------- api------------------------------------
const authenapi = require('./authen/authen_api');
const commonapi= require('./common/common_api');

const AuthenUtil = require('./authen/AuthenUtil');

const empapi = require('./employee/emp_api');


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

app.use('/emp',empapi);


//--------------------------------------------------------------

app.get("/:token",(req,res) => {
    
    //const  u = new AuthenUtil();
    AuthenUtil.checkToken(req.params.token,(r)=>{
        res.send({status:r});
    })

});

app.get("/",(req,res ) =>{
    res.send({myname:"UPI"});
});


app.listen(sysconfig.apiserver_port);
console.log("Start Cero API port : "+sysconfig.apiserver_port);