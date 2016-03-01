var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

	$scope.teamData = teamData; // now the data is in our scope and accessed in the view
	$scope.newGame = {};  //to be passed into teamService.addNewGame
	$scope.showNewGameForm = false;
	
	$scope.toggleNewGameForm = function(){
    $scope.showNewGameForm = !$scope.showNewGameForm; //makes showNewGameForm opposite of what it currently is,
    													// used to toggle the form to add a new game.
  };

  if($stateParams.team === 'utahjazz'){		//check which team URL is currently on
      $scope.homeTeam = 'Utah Jazz';		//depending on team, set propery on scope called homeTeam
      $scope.logoPath = 'images/jazz-logo.png';  //points to image of team
  } else if ($stateParams.team === 'losangeleslakers'){
      $scope.homeTeam = 'Los Angeles Lakers';
      $scope.logoPath = 'images/lakers-logo.png';
  } else if ($stateParams.team === 'miamiheat') {
      $scope.homeTeam = 'Miami Heat';
      $scope.logoPath = 'images/heat-logo.png';
  }
  
  $scope.submitGame = function() {  //homeTeam property to newGame object
  	 $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase(); //stip out spaces from homeTeam to use as endpoint in restAPI
  	 teamService.addNewGame($scope.newGame)  //call addNewGame method of teamServ and pass it newGame
  	 	.then(function(){  //callback function
  	 		teamService.getTeamData($scope.newGame.homeTeam)  //call getTeamData service, we added a new game to the home teams sched, get new data
  	 		.then(function(data){  //data returned from getTeamData method
  	 			$scope.teamData = data; //data we got back from the promise
  	 			$scope.newGame = {};  //reset to an empty object
  	 			$scope.showNewGameForm = false;  // set back to false
  	 		});
  	 	});
  };
  	
});
