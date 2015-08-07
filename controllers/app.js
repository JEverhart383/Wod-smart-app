var app = angular.module('app', [
	'ngRoute', 
	'firebase',
	'appControllers'
	]);

app.run(['$rootScope', '$location', function($rootScope, $location){
			$rootScope.$on('$routeChangeError', function(event, next, previous, error){

				if (error === "AUTH_REQUIRED"){
					$rootScope.message= "Login now!"; 
					$location.path('/login'); 
				}
			}); 
		}


	]); 

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

	$routeProvider. 
		when("/home", {
			templateUrl: "views/home.html", 
			controller: "AuthController"
		}).
		when("/login", {
			templateUrl: "views/login.html",
			controller: "AuthController"
		}). 
		when("/signup", {
			templateUrl: "views/new-user.html",
			controller: "AuthController"
		}).
		when('/dashboard', {
			templateUrl : "views/dashboard.html", 
			controller : "DashboardData", 
			resolve: {
				currentAuth: function(){
					return Authentication.requireAuth(); 
				}
			}
		}). 
		when('/new-wod', {
			templateUrl : "views/new-wod.html", 
			controller : "NewWod"
		}).
		when('/profile', {
			templateUrl : "views/profile.html", 
			controller : "NewWod"
		}). 
		otherwise({
				redirectTo: "/home"	
			}); 

		 // enable html5Mode for pushstate ('#'-less URLs)
	    $locationProvider.html5Mode(true);
	    $locationProvider.hashPrefix('!')

}]); 






















