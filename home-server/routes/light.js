var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

// ライトを与えられた状態にするIR信号を送信する
var turnLight = function(state) {
    switch (state) {
    case "ON":
	console.log("Light turning ON...");
	var command = "python /home/pi/home-iot/ir_remocon/irrp.py -p -g17 -f /home/pi/home-iot/ir_remocon/codes light:on";
	break;
    case "OFF":
	console.log("Light turning OFF...");
	var command = "python /home/pi/home-iot/ir_remocon/irrp.py -p -g17 -f /home/pi/home-iot/ir_remocon/codes light:off";
	break;
    case "MAX":
	console.log("Light turning ON (MAX)...");
	var command = "python /home/pi/home-iot/ir_remocon/irrp.py -p -g17 -f /home/pi/home-iot/ir_remocon/codes light:full";
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
