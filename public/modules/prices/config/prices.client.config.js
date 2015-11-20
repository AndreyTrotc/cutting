'use strict';

// Configuring the Prices module
angular.module('prices').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Prices', 'prices', 'dropdown', '/prices(/create)?');
		Menus.addSubMenuItem('topbar', 'prices', 'List Prices', 'prices');
		Menus.addSubMenuItem('topbar', 'prices', 'New Prices', 'prices/create');
	}
]);