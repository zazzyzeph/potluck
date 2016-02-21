// create angular app
var indexValidation = angular.module('indexValidation', []);
var potluckValidation = angular.module('potluckValidation', []);

// create angular controller
indexValidation.controller('mainController', function($scope) {

	// function to submit the form after all validation has occurred			
	$scope.submitForm = function() {
		// check to make sure the form is completely valid
		if (!($scope.userForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
});





// create angular controller
potluckValidation.controller('potluckController', function($scope, $http, $location) {
	$scope.potluck = {
		name:"",
		type:"",
		servings:0,
		allergies:[],
		notes:""
	};
	$scope.potluck.allergies = 
	{
		'Non-Vegan':false,
		'Non-Vegetarian':false,
		'Dairy':false,
		'Nuts':false,
		'Gluten':false,
		'Egg':false,
		'Tropical Fruit':false};		
		$scope.submitForm = function() {
		// function to submit the form after all validation has occurred
		// check to make sure the form is completely valid
		if (!($scope.potluckForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
	function fetch(){
		$http.get($location.absUrl() + '/items').then(function(response){
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i]);
			}
		});
	}
	fetch();
	$scope.submit = function(){
		$http.post($location.absUrl(), $scope.potluck);
		fetch();
	}
});