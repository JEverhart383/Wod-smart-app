var app = angular.module('app', [
	'ngRoute', 
	'firebase',
	'appControllers', 
	'datetimepicker', 
	'angular-dimple'
	]);

// app.run(['$rootScope', '$location', 'Authentication' function($rootScope, $location, Authentication){
// 			$rootScope.$on('$routeChangeError', function(event, next, previous, error){

// 				if (error === "AUTH_REQUIRED"){
// 					$rootScope.message= "Login now!"; 
// 					$location.path('/login'); 
// 				}
// 			}); 
// 		}


// 	]); 

app.config(["$routeProvider", "$locationProvider", 
	function($routeProvider, $locationProvider){

	$routeProvider. 
		when("/home", {
			templateUrl: "views/home.html", 
			controller: "AuthController"
		}).
		when("/login", {
			templateUrl: "views/registration-views/login.html",
			controller: "AuthController"
		}). 
		when("/signup", {
			templateUrl: "views/registration-views/new-user.html",
			controller: "AuthController"
		}).
		when('/dashboard', {
			templateUrl : "views/dashboard-views/dashboard.html", 
			controller : "DashboardData"
		}). 
		when('/new-wod', {
			templateUrl : "views/new-wod-views/new-wod.html", 
			controller : "NewWod"
		}).
		when('/profile', {
			templateUrl : "views/profile-views/profile.html", 
			controller : "ProfileData"
		}). 
		when('/edit-profile', {
			templateUrl : 'views/profile-views/edit-profile.html', 
			controller : "ProfileData"
		}).
		when('/wod-details', {
			templateUrl : "views/dashboard-views/wod-details.html", 
			controller : "DashboardData"
		}).
		when('/new-wod/new-amrap', {
			templateUrl : "views/new-wod-views/new-amrap.html", 
			controller : "NewWod"
		}).
		when('/new-wod/new-fortime', {
			templateUrl : "views/new-wod-views/new-fortime.html", 
			controller : "NewWod"
		}).
		when('/new-wod/new-forreps', {
			templateUrl : "views/new-wod-views/new-forreps.html", 
			controller : "NewWod"
		}).
		when('/new-wod/new-mono', {
			templateUrl : "views/new-wod-views/new-mono.html", 
			controller : "NewWod"
		}).
		when('/new-wod/new-strength', {
			templateUrl : "views/new-wod-views/new-strength.html", 
			controller : "NewWod"
		}).
		when('/all-wods', {
			templateUrl : "views/dashboard-views/all-wods.html", 
			controller : "DashboardData"
		}).
		otherwise({
				redirectTo: "/home"	
			}); 

		 // enable html5Mode for pushstate ('#'-less URLs)
	    $locationProvider.html5Mode(true);
	    $locationProvider.hashPrefix('!')

}]); 






















