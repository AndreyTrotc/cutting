'use strict';

angular.module('stores').controller('StoresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stores', 'Customers', 'Articles', 
	function($scope, $stateParams, $location, Authentication, Stores, Customers, Articles) {
		$scope.authentication = Authentication;
		$scope.stateParams = $stateParams;
		$scope.create = function() {
			
			var	amountRows = $scope.count;
			try{
				for (var j = amountRows; j > 0; j--) {
					var table = document.getElementById('table'),
					NameCustomer = document.getElementById('NameCustomer');
					$scope.NameCustomer = NameCustomer.value;				
					$scope.thickness = table.rows[j].cells[0].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.widthList = table.rows[j].cells[1].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.lengthList = table.rows[j].cells[2].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.amount = table.rows[j].cells[3].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.priseAllList = table.rows[j].cells[4].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.weightAllList = table.rows[j].cells[5].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.formList = table.rows[j].cells[6].childNodes[1].childNodes[1].childNodes[1].childNodes[3].checked;
					$scope.NameAcceptanceInspector = table.rows[j].cells[7].childNodes[1].value;
					$scope.sheetContent = table.rows[j].cells[8].childNodes[1].childNodes[1].childNodes[1].value;
					if($scope.NameCustomer === 'цех'){
						$scope.weightList = Math.round(($scope.weightAllList/$scope.amount)*100)/100;
					} else {
						if(!$scope.formList){
							$scope.weightList = Math.round($scope.thickness*$scope.widthList*$scope.lengthList*7.9/10000)/100;
						} else {
							$scope.weightList = 0;
						}
					}
					
					$scope.priseKg = Math.round(($scope.priseAllList/$scope.weightAllList)*100)/100;
					$scope.priseOfList =  Math.round(($scope.priseAllList/$scope.amount)*100)/100;
					if(!$scope.thickness){
						$scope.error ='Укажите толщину';
						throw new SyntaxError("Укажите толщину");
					} else if(!$scope.widthList){
						$scope.error ='Укажите ширину';
						throw new SyntaxError("Укажите ширину");
					}else if(!$scope.lengthList){
						$scope.error ='Укажите длинну';
						throw new SyntaxError("Укажите длинну");
					} else if(!$scope.NameCustomer){
						$scope.error ='Укажите имя клиента';
					} else if($scope.NameCustomer === 'цех' && (!$scope.priseAllList || !$scope.weightAllList)){					
							$scope.error = 'Если лиcты принимаются на цех, укажите цену всех листов и вес всех листов из накладной';
							throw new SyntaxError("Если лиcты принимаются на цех, укажите цену всех листов и вес всех листов из накладной");										
					} else if(!$scope.amount){
						$scope.error ='Укажите колличество листов';
						 throw new SyntaxError("Укажите колличество листов");
					} else {

						for (var i = $scope.amount - 1; i >= 0; i--) {
							var store = new Stores({
								NameAcceptanceInspector: $scope.NameAcceptanceInspector,
								NameCustomer: $scope.NameCustomer,
								thickness: $scope.thickness,
								widthList: $scope.widthList,
								lengthList: $scope.lengthList,
								amount: $scope.amount,
								weightList: $scope.weightList,
								priseOfList:  $scope.priseOfList,
								priseKg: $scope.priseKg,
								formList: $scope.formList,
								sheetContent: $scope.sheetContent
								});
								store.$save(function(response) {
								$location.path('/stores');

								$scope.NameAcceptanceInspector = '';
								$scope.NameCustomer = '';
								$scope.thickness = 0;
								$scope.widthList = 0;
								$scope.lengthList = 0;
								$scope.amount = 0;
								$scope.priseAllList = 0;
								$scope.formList = false;
								$scope.sheetContent = '';
							}, function(errorResponse) {
								$scope.error = errorResponse.data.message;
							});			
						}
					}							
				}
			} catch(error) {
				console.log(error)
			}
		};

		$scope.remove = function(store) {
			if (store) {
				store.$remove();

				for (var i in $scope.stores) {
					if ($scope.stores[i] === store) {
						$scope.stores.splice(i, 1);
					}
				}
			} else {
				$scope.store.$remove(function() {
					$location.path('stores');
				});
			}
		};

		$scope.update = function() {
			var store = $scope.store,
				calculateWeightList;
						

			$scope.formList = document.getElementById('form-list').checked;
			$scope.thickness = document.getElementById('thickness').value;
			$scope.widthList = document.getElementById('widthList').value;
			$scope.lengthList = document.getElementById('lengthList').value;
			$scope.NameCustomer = document.getElementById('NameCustomer').value;

			calculateWeightList =  Math.round(($scope.thickness*$scope.widthList*$scope.lengthList*7.86/1000000)*100)/100;					
			 
			if(!$scope.formList && $scope.NameCustomer !== 'цех'){
				store.weightList = calculateWeightList
			}
			if($scope.NameCustomer === 'цех'){
				if( $scope.initFormList && !$scope.formList){
					store.weightList = calculateWeightList
				}
				if($scope.thickness !== $scope.initThickness || $scope.widthList !== $scope.initWidthList || $scope.lengthList !== $scope.initLengthList){	
					if(!$scope.formList){
						store.weightList = calculateWeightList
					}										
				} else {
					if($scope.formList){
						store.weightList = document.getElementById('weightList').value;
					}					
				}							
			}
			store.priseOfList =  Math.round(store.weightList*store.priseKg);		

			store.$update(function() {
				$location.path('stores');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.NameCustomerSelect = document.getElementById('NameCustomerSelect').value;			
			$scope.thicknesSel = parseFloat(document.getElementById('thicknesSel').value);
			$scope.widthSel = parseInt(document.getElementById('widthSel').value);
			$scope.lengthSel = parseInt(document.getElementById('lengthSel').value);
			$scope.beforeDate = document.getElementById('before-date').value;
			$scope.afterDate = document.getElementById('after-date').value;

			$scope.select = '-created';
			$scope.sortName = document.getElementById('sort-name').checked;
			$scope.sortCreated = document.getElementById('sort-created').checked;
			$scope.sortPriseKg = document.getElementById('sort-sortPriseKg').checked;
			$scope.thickness = document.getElementById('sort-thickness').checked;
			$scope.widthList = document.getElementById('sort-widthList').checked;
			$scope.lengthList = document.getElementById('sort-lengthList').checked;

			if($scope.sortName){
				$scope.select = 'NameCustomer';								
			}

			if($scope.sortCreated){				
				$scope.select = '-created';				
			}

			if($scope.sortPriseKg){				
				$scope.select = '-priseKg';				
			}

			if($scope.thickness){				
				$scope.select = 'thickness';				
			}

			if($scope.widthList){				
				$scope.select = '-widthList';				
			}

			if($scope.lengthList){				
				$scope.select = '-lengthList';				
			}


			$scope.stores = Stores.query({CustomerSel:$scope.NameCustomerSelect,CustomerTr:$scope.thicknesSel,CustomerW:$scope.widthSel,CustomerL:$scope.lengthSel,CustomerBeforeDate:$scope.beforeDate,CustomerAfterDate:$scope.afterDate});
	    	$scope.customers = Customers.query();

	    	$scope.SumOwnMetalWeight = 0;
	    	$scope.SumOwnPriceMetal = 0;
	    	$scope.stores.$promise.then(function (stores) {

				for (var i = stores.length - 1; i >= 0; i--) {
					if(stores[i].NameCustomer === 'цех'){
						$scope.SumOwnMetalWeight = $scope.SumOwnMetalWeight + Math.round(stores[i].weightList*100)/100;
						$scope.SumOwnPriceMetal = $scope.SumOwnPriceMetal + Math.round(stores[i].priseOfList*100)/100;
					}
				}

			});			
		};

		$scope.findOne = function() {
			$scope.store = Stores.get({
				storeId: $stateParams.storeId
			});
			$scope.customers = Customers.query();

			angular.element(document).ready(function () {
				$scope.initThickness = document.getElementById('thickness').value;
				$scope.initWidthList = document.getElementById('widthList').value;
				$scope.initLengthList = document.getElementById('lengthList').value;
				$scope.initFormList = document.getElementById('form-list').checked;
			});
		};	

		$scope.findCustomer = function() {
			$scope.customers = Customers.query();
		};
		//add sheet to article
		
		$scope.AddSheetToArticle = function() {
			var stores = $scope.stores;
			for (var i in stores) {
				if (stores[i].addstatus == 1) {	
					stores[i].statuss = 1;			
					stores[i].$update(function() {
						window.history.back();
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
			}
		}
		
		
		
	}

]);
angular.module('stores').filter('convertSheetStatus', function () {	 
	  return function (item) {
	  	item = item.toString();
	  	switch (item) {
		   case '0':
		    	item = 'свободен';
		    	break
		   case '1':
		    	item = 'в роботе';
		    	break
		   default:
		      	item = '';
		      	break
		}
	    return item;
	  };
});