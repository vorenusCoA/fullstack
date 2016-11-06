var archivo01 = "Soy el archivo01";
var archivo02 = "Soy el archivo02";
var archivo03 = "Soy el archivo03";

var archivos = [];

archivos[0] = archivo01;
archivos[1] = archivo02;
archivos[2] = archivo03;

function readSyncFiles(archivos){
	for (var i = 0; i < archivos.length; i++) {
		console.log(archivos[i]);
	};
}

function readAsyncFiles(archivos){	
	for (var i = 0; i < archivos.length; i++) {
		var time = Math.floor((Math.random() * 5000) + 1);
		doSetTimeout(archivos[i], time);					
	};
}

function doSetTimeout(i, time){
	setTimeout(function(){
		console.log(i);
	}, time);	
}

console.log("Estoy por llamar a la función readSyncFiles");
readSyncFiles(archivos);
console.log("FIN readSyncFiles");

console.log("Estoy por llamar a la función readAsyncFiles");
readAsyncFiles(archivos);
console.log("FIN readAsyncFiles?");
