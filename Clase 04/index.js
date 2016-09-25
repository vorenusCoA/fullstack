var loader = require("./loader/loader.js");
var api = require("./api/api.js");

loader.loadData("archivos/people.json");

loader.ee.on("loaded", function(data){
	//api.printAmountOfPeopleOlderThan(data, 39);
	//api.printAllNames(data);
	//api.checkIfAllPeopleIsOverThanGivenAge(data, 18);
	//api.sortUsersByAge(data);
	//api.calculateAverageAge(data);
	//api.addGivenAgeToActivePeople(data, 100);
	//api.checkIfAnyUserIsInGivenState(data, "California");
})