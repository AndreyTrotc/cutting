'use strict';

//Store service used for communicating with the articles REST endpoints
angular.module('stores').factory('Stores', ['$resource',
	function($resource) {
		return $resource('stores/:storeId', {
			storeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);