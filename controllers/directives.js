app.directive('timepicker', function(){
	return {
		require: '?ngModel',
		restrict: 'A', 
		link: function(scope, element, attrs){
			console.log("directive"); 
			element.datetimepicker({
				format: 'HH:mm:ss', 
				useCurrent: false

			});


		}
	}

}); 

app.directive('datepicker', function(){
	return {
		require: '?ngModel',
		restrict: 'A', 
		link: function(scope, element, attrs){
			console.log("directive"); 
			element.datetimepicker({
				format: 'M/D/YYYY'
			}); 
		}
	}

});