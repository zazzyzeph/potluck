// create angular app
var indexValidation = angular.module('indexValidation', ['ngAnimate']);
var potluckValidation = angular.module('potluckValidation', ['ngAnimate']);

// create angular controller
indexValidation.controller('mainController', function($scope) {
	// function to submit the form after all validation has occurred			
	$scope.submitForm = function() {
		// check to make sure the form is completely valid
		if (!($scope.userForm.$valid)) {
			alert('form is invalid. y u hackin.');
		}
	};
});

// create angular controller
potluckValidation.controller('potluckController', function($scope, $http, $location) {
	$http.get($location.absUrl() + '/items').then(function successCallback(res){
		console.log(res.data);
		if (res.data.length){
			$scope.items = res.data;
		}
		else{
			$scope.items = [{
							name:"",
							type:"",
							servings:'10',
							allergies:{'Non-Vegan':false,'Non-Vegetarian':false,'Dairy':false,'Nuts':false,'Gluten':false,'Egg':false,'Tropical Fruit':false},
							notes:""
						}];
		}

	}, function errorCallback(res){
		console.log('boo!');
	});

	$scope.submitForm = function() {
		// function to submit the form after all validation has occurred
		// check to make sure the form is completely valid
		if (!($scope.potluckForm.$valid)) {
			alert('form is invalid. stop trying to hack my site.');
		}
	};
	$scope.nixItem = function(index){
		$scope.items.splice(index,1);
	}
	$scope.addItem = function(){
		$scope.items.push({name:"",type:"",servings:0,allergies:{'Non-Vegan':false,'Non-Vegetarian':false,'Dairy':false,'Nuts':false,'Gluten':false,'Egg':false,'Tropical Fruit':false},notes:""});
	}
	$scope.submit = function(){
		$http.post($location.absUrl(), $scope.items);
	}
});