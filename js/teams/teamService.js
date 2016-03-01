var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

	this.addNewGame = function(gameObj) {
		//each team's games are going to be stored at a RESTful endpoint which points to the teams specific name (gameObj.homeTeam).
		var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
	
		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {  //parseInt return as integer
			gameObj.won = true;  //set property
    	} else {
      		gameObj.won = false;
    	}
    	return $http({		//POST request to parse to our URL we made earlier, 
		    method: 'POST',  //sending gameObj as the data.
		    url: url,
		    data: gameObj
		});					//returns a promise
	};
	this.getTeamData = function(team) {  //fetch data of specific team
		$q.defer();		//create deferred object
		var url = 'https://api.parse.com/1/classes/' + team;
		$http.get(url)
		.then (function(data) {  //data we get back from parse when GET request to specific url
			var results = data.data.results;  //actual games the team has played
			var wins = 0;
			var losses = 0;
			for(var i = 0; i < results.length; i++){  //loop over results
          		if(results[i].won){					//if win, increment wins
            		wins++;
          		} else {
            		losses++;
          		}
        	}							//arrays are just like objects
        	results.wins = wins;  		//add wins property to results array
        	results.losses = losses;	//add losses property to results array
        	deferred.resolve(results);	//resolve our deferred object
		});
		return deferred.promise;	// after modifying data recieved from api.parse,return promise on def object,
	};

});
