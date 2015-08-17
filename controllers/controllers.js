var appControllers = angular.module("appControllers", ["firebase"]); 


appControllers.controller("AuthController",
	[ "$scope", "$firebaseAuth", "$location", "$firebaseObject", "$firebaseArray", "Authentication", 
	  function ($scope, $firebaseAuth, $location, $firebaseObject, $firebaseArray, Authentication){

	var firebaseRef = new Firebase("https://amber-heat-2742.firebaseio.com");
	var auth = $firebaseAuth(firebaseRef); 
	var object = $firebaseObject(firebaseRef); 

	$scope.user = { };
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


app.controller("NewWod", 
	[ '$rootScope', '$scope', '$location', '$firebase', '$firebaseArray','$routeParams', 'WodFactory','MovementFactory',
	function($rootScope, $scope, $location, $firebase, $firebaseArray, $routeParams, WodFactory, MovementFactory){
	

	
	var movementArray = MovementFactory.createNewMovementArray(); 
	$scope.movements = movementArray; 

	
	// var wodsArray = WodFactory.createWodArray(); 
	$scope.wods = $rootScope.wodsArray; 
	var wodsArray = $rootScope.wodsArray;



	$scope.wod = {

	}; 



	$scope.createNewWod = function(){
		
		console.log($scope); 

		wodsArray.$add($scope.wod).
		then(function(){
			$("input").val(" ");
			$("textarea").val(" "); 
			console.log(wodsArray);	
		}); 

	}




}]); 

appControllers.controller('DashboardData', 
	[ '$rootScope', '$scope', '$location', '$firebase', '$firebaseArray','$routeParams', 'WodFactory',
	function($rootScope, $scope, $location, $firebase, $firebaseArray, $routeParams, WodFactory){


	console.log($rootScope.wodsArray); 
	console.log($rootScope.numberOfWods);  

	$scope.wods = $rootScope.wodsArray; 

	var wodsArray = $rootScope.wodsArray; 


	$scope.viewWodDetails = function(id){

		$location.path('/wod-details'); 
		//A bit hacky but it works for this example, think about using route params or something later
		$rootScope.wodDetails = wodsArray.$getRecord(id); 

		console.log($scope.wodDetails); 		

	}

	$scope.deleteWod = function(id){

		var wodToDelete = wodsArray.$getRecord($rootScope.wodDetails.$id); 
		console.log(wodToDelete); 
		
		wodsArray.$remove(wodToDelete).then(function(ref){
			$location.path('/dashboard');
			console.log("deleted " + ref); 
		}); 
	}

	$scope.deleteAllWod = function(key){

		var wodToDelete = wodsArray.$getRecord(key); 
		console.log(wodToDelete); 
		
		wodsArray.$remove(wodToDelete).then(function(ref){
			$location.path('/dashboard');
			console.log("deleted " + ref); 
		}); 
	}

}]); 

appControllers.controller("ProfileData", function($rootScope, $scope, $location, $firebase, $firebaseObject){

	var userId = $rootScope.currentUser.uid; 
	var firebaseRef = new Firebase('https://amber-heat-2742.firebaseio.com/users/' + userId );
	var firebaseProfileRef = new Firebase('https://amber-heat-2742.firebaseio.com/users/' + userId + '/profile');

	var profileObject = $firebaseObject(firebaseProfileRef); 

	var wodsArray = $rootScope.wodsArray; 

	$rootScope.userRecord = profileObject;


	$scope.updateProfile = function(){

		firebaseRef.child("firstname").set($rootScope.currentUser.firstname); 
		firebaseRef.child("lastname").set($rootScope.currentUser.lastname);

		firebaseProfileRef.child("feet").set($rootScope.userRecord.feet); 
		firebaseProfileRef.child("inches").set($rootScope.userRecord.inches); 
		firebaseProfileRef.child("age").set($rootScope.userRecord.age); 
		firebaseProfileRef.child("affiliate").set($rootScope.userRecord.affiliate);
		firebaseProfileRef.child("weight").set($rootScope.userRecord.weight); 
		firebaseProfileRef.child("sex").set($rootScope.userRecord.sex);  


		console.log($scope.userRecord); 

		$location.path('/profile'); 

	}

	$scope.cancelProfileUpdate = function(){

		$location.path('/profile'); 
	
	}


	


}); 













