var async = require('async');

function setThreeTimeOutsInParallelForTheGivenSeconds(time){
	var pre = Date.now();
	async.parallel([
	    function(parallelCb) {
	        setTimeout(function() {
	            console.log('Timer 1 completo - Parallel')
	        	parallelCb();
	        }, time * 1000);
	    },
	    function(parallelCb) {
	        setTimeout(function() {
	            console.log('Timer 2 completo - Parallel')
	        	parallelCb();
	        }, time * 1000);
	    },
	    function(parallelCb) {
	        setTimeout(function() {
	            console.log('Timer 3 completo - Parallel')
	        	parallelCb();
	        }, time * 1000);
	    }
		],
		function(err, results) {
			if(err) return console.log(err);
			var post = Date.now();
			var tiempoTranscurrido = post - pre;
			console.log("Tiempo transcurrido: " +  (tiempoTranscurrido / 1000));	    
		}
	);
}

function setThreeTimeOutsInSerieForTheGivenSeconds(time) {
	var pre = Date.now();
	async.series([
	    function(seriesCb) {
	        setTimeout(function(){
	        	console.log('Timer 1 completo - Serie')
	        	seriesCb();
	        }, time * 1000);	        
	    },
	    function(seriesCb) {
	        setTimeout(function(){
	        	console.log('Timer 2 completo - Serie')
	        	seriesCb();
	        }, time * 1000);
	    },
	    function(seriesCb) {
	        setTimeout(function(){
	        	console.log('Timer 3 completo - Serie')
	        	seriesCb();
	        }, time * 1000);
	    }
		],
		function(err, results) {
		    if(err) return console.log(err);
		    var post = Date.now();
			var tiempoTranscurrido = post - pre;
			console.log("Tiempo transcurrido: " +  (tiempoTranscurrido / 1000));	    
		}
	);
}

module.exports = {
	setThreeTimeOutsInParallelForTheGivenSeconds : setThreeTimeOutsInParallelForTheGivenSeconds,
	setThreeTimeOutsInSerieForTheGivenSeconds : setThreeTimeOutsInSerieForTheGivenSeconds
}
