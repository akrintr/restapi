const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const sysconfig = require("./sysconfig");

router.get("/hash/:txt", (req,res) =>{
    const hash = crypto.createHmac('sha256', sysconfig.hashkey)
                   .update(req.params.txt)
                   .digest('hex');
    res.send({cypher: hash});
});

module.exports = router;