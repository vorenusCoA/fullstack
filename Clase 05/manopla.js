// se trata de simular el comportamiento de los métodos parallel() y series() de async.js

var eventos = require('events');
var EmisorEventos = eventos.EventEmitter;
var ee = new EmisorEventos();

/*----------------------------PARALLEL-------------------------------*/

// var pre;
// var counter = 0;

// function end(){
// 	var post = Date.now();
// 	var tiempoTranscurrido = post - pre;
// 	console.log("Tiempo transcurrido: " +  (tiempoTranscurrido / 1000));
// }

// function timer01(time) {
// 	setTimeout(function(){
// 		console.log('Timer 1 completo');
// 		counter++
// 		if(counter == 3){
// 			end();
// 		}		
// 	}, time * 1000);
// }

// function timer02(time) {
// 	setTimeout(function(){
// 		console.log('Timer 2 completo');
// 		counter++
// 		if(counter == 3){
// 			end();
// 		}
// 	}, time * 1000);
// }

// function timer03(time) {
// 	setTimeout(function(){
// 		console.log('Timer 3 completo');
// 		counter++
// 		if(counter == 3){
// 			end();
// 		}
// 	}, time * 1000);
// }


// function setThreeTimeOutsInParallelForTheGivenSeconds(time) {
// 	pre = Date.now();
// 	timer01(time);
// 	timer02(time);
// 	timer03(time);
// }

// setThreeTimeOutsInParallelForTheGivenSeconds(3);

/*----------------------------SERIES-------------------------------*/

var pre;

function end(){
	var post = Date.now();
	var tiempoTranscurrido = post - pre;
	console.log("Tiempo transcurrido: " +  (tiempoTranscurrido / 1000));
}

function timer01(time) {
	setTimeout(function(){
		console.log('Timer 1 completo');		
		timer02(time);		
	}, time * 1000);
}

function timer02(time) {
	setTimeout(function(){
		console.log('Timer 2 completo');
		timer03(time);
	}, time * 1000);
}

function timer03(time) {
	setTimeout(function(){
		console.log('Timer 3 completo');
		end();
	}, time * 1000);
}

function setThreeTimeOutsInSerieForTheGivenSeconds(time) {
	pre = Date.now();
	timer01(time);
}

setThreeTimeOutsInSerieForTheGivenSeconds(3);
