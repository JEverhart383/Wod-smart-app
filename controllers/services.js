app.factory('Authentication', function($firebase, $firebaseAuth, $routeParams, $location, $rootScope, $firebaseObject, $firebaseArray){

	var firebaseRef = new Firebase("https://amber-heat-2742.firebaseio.com");
	var auth = $firebaseAuth(firebaseRef); 

	auth.$onAuth(function(authUser){
		if(authUser){
			var userRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + authUser.uid); 
			var user = $firebaseObject(userRef); 

			$rootScope.currentUser = user; 
			
			var wodsRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + authUser.uid + "/wods");
			$rootScope.wodsArray = $firebaseArray(wodsRef); 
			$rootScope.wodsObject = $firebaseObject(wodsRef); 

			$rootScope.wodsArray.$loaded()
			.then(function(wodsArray){
				$rootScope.numberOfWods = $rootScope.wodsArray.length; 
			}); 

			$rootScope.wodsArray.$watch(function(){
				$rootScope.numberOfWods = $rootScope.wodsArray.length; 
			}); 


			$location.path('/dashboard'); 


		} else {
			$rootScope.currentUser = ''; 
		}
	}); 

	var myObject = {

		login: function(user){
			return auth.$authWithPassword({
				email: user.email, 
				password: user.password
			}); 
		},//login function 

		logout: function(){
			return auth.$unauth(); 
		},

		register: function(user){
			return auth.$createUser({
				email: user.email, 
				password: user.password
			}); 
		}, //register function 

		requireAuth: function(){
			return auth.$requireAuth();

		}, //requireAuth function

		waitForAuth: function(){
			return auth.$waitForAuth(); 
		} 

	}; 

	return myObject; 


});



app.factory("WodFactory", function($firebase, $firebaseArray, $location, $rootScope, $firebaseObject){


wodsFactoryObject = {

	createWodArray: function(){

		var userId = $rootScope.currentUser.uid; 
		var wodRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + userId + "/wods"); 
		var wodArray = $firebaseArray(wodRef); 
		return wodArray; 

	}, 

	createWodObject: function(){

		var userId = $rootScope.currentUser.uid; 
		var wodRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + userId + "/wods"); 
		var wodObject = $firebaseObject(wodRef); 
		return wodObject; 

	}


}; 

return wodsFactoryObject; 

}); 



app.factory("MovementFactory", function(){

	movementFactoryObject = {

		createNewMovementArray: function(){
			var MovementArray = [
					{
						'move': 'Back Squat', 
						'tag': 'Powerlifting'
					}, 
					{
						'move': 'Snatch', 
						'tag': 'Olympic'
					},
					{
						'move': 'Clean and Jerk', 
						'tag': 'Olympic'
					}, 
					{
						'move': 'Bench Press', 
						'tag': 'Powerlifting'
					}, 
					{
						'move': 'Deadlift', 
						'tag': 'Powerlifting'
					}
				]; 

				return MovementArray; 
			}
		}; 

	return movementFactoryObject; 
});


app.factory("BenchmarkFactory", function(){



}); 









