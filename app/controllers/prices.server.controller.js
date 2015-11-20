'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Price = mongoose.model('Price'),
	_ = require('lodash');

/**
 * Create a price
 */
exports.create = function(req, res) {
	var price = new Price(req.body);
	price.user = req.user;

	price.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(price);
		}
	});
};

/**
 * Show the current price
 */
exports.read = function(req, res) {
	res.json(req.price);
};

/**
 * Update a price
 */
exports.update = function(req, res) {
	var price = req.price;

	price = _.extend(price, req.body);

	price.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(price);
		}
	});
};

/**
 * Delete an price
 */
exports.delete = function(req, res) {
	var price = req.price;

	price.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(price);
		}
	});
};

/**
 * List of Prices
 */
exports.list = function(req, res) {
	Price.find().sort('-created').populate('user', 'displayName').exec(function(err, prices) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(prices);
		}
	});
};

/**
 * Price middleware
 */
exports.priceByID = function(req, res, next, id) {
	Price.findById(id).populate('user', 'displayName').exec(function(err, price) {
		if (err) return next(err);
		if (!price) return next(new Error('Failed to load price ' + id));
		req.price = price;
		next();
	});
};

/**
 * Price authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.price.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};