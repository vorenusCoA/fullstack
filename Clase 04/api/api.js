var async = require("async");

function printAmountOfPeopleOlderThan(people, age){
	async.filter(people, function(person, filterCb){
		if(!person.hasOwnProperty("age")){
			return filterCb("La persona no tiene definida su edad");
		}
		var save = person.age > age;
		filterCb(null, save)
	}, function(err, results){
		if(err) return console.log(err);
		console.log("La cantidad de personas mayores a " + age + " son: " + results.length);
	})
}

function printAllNames(people){
	async.each(people, function(person, eachNameCb){
		console.log(person.name);
		eachNameCb();
	}, function(err){
		if(err) return console.log(err);
	})
}

function checkIfAllPeopleIsOverThanGivenAge(people, age){
	async.every(people, function(person, everyCb){
		if(!(person.age > age)){
			return everyCb("Hay personas menores de: " + age + " años");
		}
		everyCb(null, true);
	}, function(err, results){
		if(err) return console.log(err);
		console.log("Todas las personas son mayores de: " + age + " años")
	})
}

function sortUsersByAge(people){
	async.sortBy(people, function(person, sortByCb){
		sortByCb(null, person.age);
	}, function(err, results){
		if(err) return console.log(err);
		console.log(results);
	})
}

function calculateAverageAge(people){
	async.reduce(people, 0, function(memo, person, reduceCb) {	    
		reduceCb(null, memo + person.age)	    
	}, function(err, result) {
	   	if(err) return console.log(err);
	    console.log("El promedio de edad es: " + result / people.length);
	})
}

function addGivenAgeToActivePeople(people, age){
	async.each(people, function(person, eachCb){
		if(person.hasOwnProperty("isActive")){
			if(person.isActive){
				person.age = person.age + age;
			}
			eachCb(null, "Valor actualizado");
		}
	}, function(err){
		if(err) return console.log(err);
		console.log("A todas las personas activas se les sumó " + age + " años.");
		//console.log(people);
	})
}

function checkIfAnyUserIsInGivenState(people, state){
	async.some(people, function(person, someCb){
		var personState = person.address.indexOf(state) != -1
		someCb(null, personState);
				
	}, function(err, result){
		if(err) return console.log(err);
		if(!result) return console.log("No hay usuarios en el estado de: " + state);
		console.log("Hay usuarios en el estado de: " + state);
	})
}

module.exports = {
	addGivenAgeToActivePeople : addGivenAgeToActivePeople,
	checkIfAllPeopleIsOverThanGivenAge : checkIfAllPeopleIsOverThanGivenAge,
	checkIfAnyUserIsInGivenState : checkIfAnyUserIsInGivenState,
	sortUsersByAge : sortUsersByAge,
	calculateAverageAge : calculateAverageAge,
	printAllNames : printAllNames,
	printAmountOfPeopleOlderThan : printAmountOfPeopleOlderThan
}
