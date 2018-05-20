var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

// 与えられたMACアドレスの機器をWake on LANする
var wakeOnLan = function(macAddress) {
    exec("wakeonlan " + macAddress,
    	 function(err, stdout, stderr) {
    	     console.log(stdout);
    	 });
}

// POSTで{"mac_address": *}が来たら対応する機器をWake on LANする
router.post('/', function(req, res, next) {
    wakeOnLan(req.body.mac_address);
    res.json({"status": "OK", "mac_address": req.body.mac_address});
});

module.exports = router;
