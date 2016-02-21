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
	$http.get($location.absUrl() + '/items').then(function successCallback(res){
		$scope.items = res.data;
	}, function errorCallback(res){
		$scope.items = {
		name:"",
		type:"",
		servings:0,
		allergies:{'Non-Vegan':false,'Non-Vegetarian':false,'Dairy':false,'Nuts':false,'Gluten':false,'Egg':false,'Tropical Fruit':false},
		notes:""
	};
	});
		
	$scope.submitForm = function() {
		// function to submit the form after all validation has occurred
		// check to make sure the form is completely valid
		if (!($scope.potluckForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
	$scope.nix = function(index){
		$scope.items.splice(index,1);
	}
	$scope.addItem = function(){
		$scope.items.push({name:"",type:"",servings:0,allergies:{'Non-Vegan':false,'Non-Vegetarian':false,'Dairy':false,'Nuts':false,'Gluten':false,'Egg':false,'Tropical Fruit':false},notes:""});
	}
	$scope.submit = function(){
		$http.post($location.absUrl(), $scope.items);
	}
});