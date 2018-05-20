var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

// ライトを与えられた状態にするIR信号を送信する
var turnLight = function(state) {
    switch (state) {
    case "ON":
	var command = "python ../ir_remocon/irrp.py -p -g17 -f ../ir_remocon/codes light:on";
	break;
    case "OFF":
	var command = "python ../ir_remocon/irrp.py -p -g17 -f ../ir_remocon/codes light:off";
	break;
    case "MAX":
	var command = "python ../ir_remocon/irrp.py -p -g17 -f ../ir_remocon/codes light:full";
	break;
    }
    exec(command,
 	 function(err, stdout, stderr) {
    	     console.log(stdout);
    	 });
}

// POSTで{"state": "ON/OFF/MAX"}などが来たらライトを操作する
router.post('/', function(req, res, next) {
    turnLight(req.body.state);

    res.json({"status": "OK", "state": req.body.state});
});

module.exports = router;
