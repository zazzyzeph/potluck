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
potluckValidation.controller('potluckController', function($scope) {
	$scope.allergies = [
		'Non-Vegan', 
		'Non-Vegetarian', 
		'Dairy', 
		'Nuts',
		'Gluten',
		'Egg',
		'Tropical Fruit'
	];
	// function to submit the form after all validation has occurred			
	$scope.submitForm = function() {
		// check to make sure the form is completely valid
		if (!($scope.potluckForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
	
});