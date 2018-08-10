const express = require('express');
const router = express.Router();

const DBHelper = require('../common/DBHelper');
const AuthenUtil = require('../authen/AuthenUtil');


router.get("/getemp/:token/:id", (req,res) =>{

    AuthenUtil.checkToken(req.params.token,(r)=>{

        if (r){
            const dbhel = new DBHelper();

            dbhel.Query("select * from emp_mas where emp_key = '"+req.params.id+"'",(r) =>{
                res.send({result: r.result });
            });
        } else {
            res.send({result : "Error"});
        }

    });
       

});

module.exports = router;