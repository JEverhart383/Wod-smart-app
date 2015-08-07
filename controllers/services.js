app.factory('Authentication', function($firebase, $firebaseAuth, $routeParams, $location, $rootScope, $firebaseObject){

	var firebaseRef = new Firebase("https://amber-heat-2742.firebaseio.com");
	var auth = $firebaseAuth(firebaseRef); 

	auth.$onAuth(function(authUser){
		if(authUser){
			var userRef = new Firebase("https://amber-heat-2742.firebaseio.com/users/" + authUser.uid); 
			var user = $firebaseObject(userRef); 

			$rootScope.currentUser = user; 
			
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