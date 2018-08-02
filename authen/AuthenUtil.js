const DBHelper = require('../common/DBHelper');


function AuthenUtil(){}
    
    AuthenUtil.checkToken = (tokenid,callback)=>{
        dbhel = new DBHelper();

        dbhel.Query("select * from SEC_Token where tokenid = '"+tokenid+"'",
        (r) =>{
            if (r.iserror ||r.result.length == 0 )
                callback (false)
            else
            {
                let expdate = new Date(r.result[0].expiredate);
                
                expdate.setTime(expdate.getTime() - (7*60*60*1000));

                const thisdate = new Date();
                if (thisdate > expdate)
                {
                    callback (false);
                }
                else{
                    //console.log('hey2');
                    //---------- update expire date to 3 hour
                    dbhel.Query("update sec_token set updatedate = getdate(), "+
                                " expiredate = DATEADD(hour,3,getdate()) "+
                                " where tokenid = '"+tokenid+"' ",(rupd)=>{
                        if (rupd.iserror)
                            callback ( false)
                        else
                            callback ( true)
                    });
                }
            }
        });

    }

module.exports = AuthenUtil;