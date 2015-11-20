'use strict';

angular.module('test').directive('addarticlefield',[  '$http','$compile', 
	 function( $http, $compile){

	 	var tmp_add_article = 'modules/articles/views/add-article.html';
	 	

		return function(scope, element, attrs){

			

			$http.get(tmp_add_article).then(function(response){
				scope.countArt = 0;
				element.bind('click', function(){
					scope.countArt++;
					angular.element(document.getElementById('add-article')).append($compile(response.data)(scope));					
	          	});
	         });
			
			
		};
}]);




