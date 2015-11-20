'use strict';

angular.module('test').directive('addlist',[  '$http','$compile', 
	 function( $http, $compile){

	 	var tmp_add_list = 'modules/stores/views/add-list.html';
	 	

		return function(scope, element, attrs){

			

			$http.get(tmp_add_list).then(function(response){
				scope.count = 0;
				element.bind('click', function(){
					scope.count++;
					angular.element(document.getElementById('add-list')).append($compile(response.data)(scope));					
	          	});
	         });
			
			
		};
}]);




//'<form name="storeForm'+scope.count+'" class="form-horizontal" data-ng-submit="create()" novalidate>'+response.data+'</form>'