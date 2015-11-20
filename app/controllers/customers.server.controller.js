'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Customer = mongoose.model('Customer'),
	_ = require('lodash');

/**
 * Create a Сustomer
 */
exports.create = function(req, res) {
	var customer = new Customer(req.body);
	customer.user = req.user;

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * Show the current customer
 */
exports.read = function(req, res) {
	res.json(req.customer);
};

/**
 * Update a customer
 */
exports.update = function(req, res) {
	var customer = req.customer;

	customer = _.extend(customer, req.body);

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * Delete an customer
 */
exports.delete = function(req, res) {
	var customer = req.customer;

	customer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * List of customers
 */
exports.list = function(req, res) {

	var argC= {};
			if (req.query.CustomerSelC){
				argC.nameCustomer = req.query.CustomerSelC;
			}

	Customer.find(argC).sort('-created').populate('user', 'displayName').exec(function(err, customer) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * customer middleware
 */
exports.customerByID = function(req, res, next, id) {
	Customer.findById(id).populate('user', 'displayName').exec(function(err, customer) {
		if (err) return next(err);
		if (!customer) return next(new Error('Failed to load customer ' + id));
		req.customer = customer;
		next();
	});
};

/**
 * customer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.customer.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};