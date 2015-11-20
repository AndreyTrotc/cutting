'use strict';

angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers',
	function($scope, $stateParams, $location, Authentication, Customers) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var customer = new Customers({
				nameCustomer: this.nameCustomer,
				content: this.content,
				discount: this.discount
			});
			customer.$save(function(response) {
				$location.path('customers/' + response._id);

				$scope.nameCustomer = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(customer) {
			if (customer) {
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers[i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};

		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.select = 'nameCustomer';
			$scope.NameCustomerSelectC = document.getElementById('NameCustomerSelectC').value;
			$scope.sortName = document.getElementById('sort-name').checked;
			$scope.sortDiscount = document.getElementById('sort-discount').checked;
			$scope.sortCreate = document.getElementById('sort-create').checked;

			if($scope.sortName){
				$scope.select = 'nameCustomer';								
			}

			if($scope.sortDiscount){				
				$scope.select = '-discount';				
			}

			if($scope.sortCreate){				
				$scope.select = '-created';				
			}
			
			Customers.query({CustomerSelC:$scope.NameCustomerSelectC}, function(customers) {
	        	$scope.customers = customers;
	    	});


		};

		$scope.findOne = function() {
			$scope.customer = Customers.get({
				customerId: $stateParams.customerId
			});
		};

	}
]);