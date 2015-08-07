var appControllers = angular.module("appControllers", ["firebase"]); 


appControllers.controller("AuthController",[ "$scope", "$firebaseAuth", "$location", "$firebaseObject", "$firebaseArray", "Authentication",   function ($scope, $firebaseAuth, $location, $firebaseObject, $firebaseArray, Authentication){

	var firebaseRef = new Firebase("https://amber-heat-2742.firebaseio.com");
	var auth = $firebaseAuth(firebaseRef); 
	var object = $firebaseObject(firebaseRef); 

	$scope.user = {};
	$scope.user.email = "" ; 
	$scope.user.password = "" ; 
	$scope.user.firstname = "" ; 
	$scope.user.lastname = "" ; 

	

	$scope.login = function(){
		Authentication.login($scope.user).
		then(function(authData){
				console.log("logged in as " + authData.uid); 
				$location.path("/dashboard"); 
			}).catch(function(error){
				$scope.message = error.message; 
				console.log("This error happended: " + error); 
			});  

	}; 

	$scope.logout = function(){

		Authentication.logout(); 
		$location.path('/login'); 

	}; 

	$scope.register = function(){
			Authentication.register($scope.user).
			then(function(userData){
					
					$scope.user.uid = userData.uid; 
					//save new users info in database 
					var userRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + userData.uid); 
					var data = $firebaseObject(userRef); 

					userRef.set({
						email : $scope.user.email, 
						firstname : $scope.user.firstname, 
						lastname : $scope.user.lastname, 
						uid: $scope.user.uid
					});

					//login newly created user
					Authentication.login($scope.user).
					then(function(authData){
						console.log("logged in as " + authData.uid); 
						$location.path("/dashboard"); 

					}).catch(function(error){
						console.log("Failed to login: " + error); 

					}); 
			

			}).catch(function(error){
				$scope.message = error.message; 
				console.log("This error happended: " + error); 
			}); 
	}; 
}]);	//End LoginController 


app.controller("NewWod", function($rootScope, $scope, $location, $firebase, $firebaseArray){
	
	var userId = $rootScope.currentUser.uid; 
	var firebaseRef = new Firebase('https://amber-heat-2742.firebaseio.com/users/' + userId + '/wods');

	var wodsArray = $firebaseArray(firebaseRef); 

	$scope.createTimepicker = function(){
		    $('#wodTime').timepicker({
			      template: 'modal', 
			      appendWidgetTo: 'body', 
			      minuteStep: 1, 
			      showSeconds: true, 
			      showMeridian: false, 
			      secondStep: 1, 
			      defaultTime: false, 
			      showInputs: true
			  });
	}; 
	 

	$scope.wod = {}; 
	$scope.wod.wodName = ""; 
	$scope.wod.date = ""; 
	$scope.wod.scoreType = ""; 
	$scope.wod.distance = ""; 
	$scope.wod.distance.measure = ""; 
	$scope.wod.score = ""; 
	$scope.wod.desc = ""; 

	$scope.createNewWod = function(){
		wodsArray.$add($scope.wod).
		then(function(){
			$("input").val(" ");
			$("textarea").val(" "); 
			console.log(wodsArray);	
		}); 

	}; 




}); 

appControllers.controller("DashboardData", function( $rootScope, $scope, $location, $firebase, $firebaseArray){

	var userId = $rootScope.currentUser.uid; 
	var firebaseRef = new Firebase('https://amber-heat-2742.firebaseio.com/users/' + userId + '/wods');

	var wodsArray = $firebaseArray(firebaseRef); 

	$scope.wods = wodsArray; 

// Create read data logic here for wods list 


}); 
