'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	prices = require('../../app/controllers/prices.server.controller');

module.exports = function(app) {
	// Price Routes
	app.route('/prices')
		.get(prices.list)
		.post(users.requiresLogin, prices.create);

	app.route('/prices/:priceId')
		.get(prices.read)
		.put(users.requiresLogin, prices.hasAuthorization, prices.update)
		.delete(users.requiresLogin, prices.hasAuthorization, prices.delete);

	// Finish by binding the price middleware
	app.param('priceId', prices.priceByID);
};