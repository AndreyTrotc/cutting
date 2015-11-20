'use strict';

//Prices service used for communicating with the prices REST endpoints
angular.module('prices').factory('Prices', ['$resource',
	function($resource) {
		return $resource('prices/:priceId', {
			priceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);