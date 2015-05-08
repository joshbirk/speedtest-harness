var speedTest = require('speedtest-net');
var schedule = require('node-schedule');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');
var connection_result = mongoose.model('connection_result', { timestamp: Date, download: Number, upload: Number });

console.log("starting schedule process");
var j = schedule.scheduleJob('0,30 * * * *', function(){
    console.log("starting test run");
    test=speedTest({maxTime:5000});
    test.on('data',function(data){
		console.log("test run completed");
		var time_now = new Date();
		var new_speed = new connection_result({ timestamp: time_now, download: data.speeds.download, upload: data.speeds.upload });
		new_speed.save(function (err) {
			console.log("test run saved");
		});
  	})
});
