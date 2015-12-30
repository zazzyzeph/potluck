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
	// function to submit the form after all validation has occurred
	$scope.allergies = [
		{name:'Non-Vegan', selected:false},
		{name:'Non-Vegetarian', selected:false},
		{name:'Dairy', selected:false},
		{name:'Nuts', selected:false},
		{name:'Gluten', selected:false},
		{name:'Egg', selected:false},
		{name:'Tropical Fruit', selected:false}
	];		
	$scope.submitForm = function() {
		// check to make sure the form is completely valid
		if (!($scope.potluckForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
});