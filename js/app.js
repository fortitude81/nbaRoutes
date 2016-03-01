var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $urlRouterProvider.otherwise('/');

    $stateProvider
		.state('home', {
			url: '/',
			controller: 'homeCtrl', //from controller
			templateUrl: "js/home/homeTmpl.html"
		})
		.state('teams', {
			url: '/teams/:team',  //:team allows us to pass specific team into getTeamData meth
			controller: 'teamCtrl',
			templateUrl: 'js/teams/teamTmpl.html',
			resolve: {
        		teamData: function($route, teamService, $stateParams){
          			return teamService.getTeamData($stateParams.team);  // return promise, data now available controller as teamData
        		}
      		}
      	})

})
