'use strict';

angular.module('prices').controller('PricesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Prices',
	function($scope, $stateParams, $location, Authentication, Prices) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			$scope.prices = Prices.query();
			$scope.thickness = this.thickness;
			$scope.thicknessPrice = this.thicknessPrice;
			$scope.thicknessPiercePrice = this.thicknessPiercePrice;
			$scope.error = 0;

			$scope.prices.$promise.then(function (prices) {
				for (var i = prices.length - 1; i >= 0; i--) {
					if($scope.prices[i].thickness === $scope.thickness){
						return $scope.error = "Такая толщина уже существует в прайсе! В случае потребности редактируйте толщину!";
					}						
				}
				if(!$scope.error){
					var price = new Prices({
						thickness: $scope.thickness,
						thicknessPrice: $scope.thicknessPrice,
						thicknessPiercePrice: $scope.thicknessPiercePrice
					});
					price.$save(function(response) {
						$location.path('prices/' + response._id);

						$scope.thickness = 0;
						$scope.thicknessPrice = 0;
						$scope.thicknessPiercePrice = 0;
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
									
			});

			
			
		};

		$scope.remove = function(price) {
			if (price) {
				price.$remove();

				for (var i in $scope.prices) {
					if ($scope.prices[i] === price) {
						$scope.prices.splice(i, 1);
					}
				}
			} else {
				$scope.price.$remove(function() {
					$location.path('prices');
				});
			}
		};

		$scope.update = function() {
			var price = $scope.price;

			price.$update(function() {
				$location.path('prices/' + price._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});			
		};



		$scope.find = function() {
			$scope.prices = Prices.query();
		};

		$scope.findOne = function() {			
			$scope.price = Prices.get({
				priceId: $stateParams.priceId
			});			
		};
	}
]);