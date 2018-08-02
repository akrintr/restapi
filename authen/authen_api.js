const express = require('express');
const router = express.Router();

const DBHelper = require('../common/DBHelper');
const crypto = require('crypto');
const sysconfig = require('../common/sysconfig');


router.post('/submit', (req, res) => {

    const dbhel = new DBHelper();
    
    dbhel.Query("select * from ctl_userlogin where userid='"+req.body.userid+"'",
        (result) =>{
            if (result.iserror)
                res.send({tokenId:'',login:false});
            else{
                if (result.length == 0){
                    res.send({tokenId:'',login:false});
                } else {
                    const createdate = new Date();
                    const token = crypto.createHmac('sha256', sysconfig.hashkey)
                       .update(req.body.userid+createdate.toLocaleString())
                       .digest('hex');
    
                    const expiredate = new Date(createdate);
    
                    expiredate.setTime(expiredate.getTime() + 3*60*60*1000);
    

                    //----------- insert into token

                    const {result:emp} = result;
                    
                    const sqltoken = "insert into sec_token values ('"+token +"'," +
                    "'"+emp[0].userid +"'," +
                    "'"+emp[0].prs_no +"'," +
                    "'"+createdate.toLocaleString() +"'," +
                    "'"+createdate.toLocaleString() +"'," +
                    "'"+expiredate.toLocaleString() +"')";

                    dbhel.Query(sqltoken,(insresult)=>{
                        if (insresult.iserror)
                            res.send({tokenId:'',login:false});
                        else
                            res.send({tokenId:token,login:true});
                    });
                }
            }
    });

 
});

module.exports = router;