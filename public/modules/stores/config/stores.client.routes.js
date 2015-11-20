'use strict';

// Setting up route
angular.module('stores').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listStores', {
			url: '/stores',
			templateUrl: 'modules/stores/views/list-stores.client.view.html'
		}).
		state('createStore', {
			url: '/stores/create',
			templateUrl: 'modules/stores/views/create-store.client.view.html'
		}).
		state('editStore', {
			url: '/stores/:storeId/edit',
			templateUrl: 'modules/stores/views/edit-store.client.view.html'
		}).
		state('storeAddSheet', {
			url: '/store/article/:articleId/sheet/:sheetId/add',
			templateUrl: 'modules/stores/views/add-article-store.client.view.html'
		});
	}
]);