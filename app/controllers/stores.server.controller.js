'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Store = mongoose.model('Store'),
	_ = require('lodash');

/**
 * Create a store
 */
exports.create = function(req, res) {
	var store = new Store(req.body);
	store.user = req.user;

	store.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(store);
		}
	});
};

/**
 * Show the current store
 */
exports.read = function(req, res) {
	res.json(req.store);
};

/**
 * Update a store
 */
exports.update = function(req, res) {
	var store = req.store;

	store = _.extend(store, req.body);

	store.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(store);
		}
	});
};

/**
 * Delete an store
 */
exports.delete = function(req, res) {
	var store = req.store;

	store.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(store);
		}
	});
};

/**
 * List of Store
 */
exports.list = function(req, res) {

			var arg= {},
			argDate = {};
			if (req.query.CustomerSel){
				arg.NameCustomer = req.query.CustomerSel;
			}
			if (parseFloat(req.query.CustomerTr)){
				arg.thickness = req.query.CustomerTr;
			}
			if (parseInt(req.query.CustomerW)){
				arg.widthList = req.query.CustomerW;
			}
			if (parseInt(req.query.CustomerL)){
				arg.lengthList = req.query.CustomerL;
			}
			if (req.query.CustomerBeforeDate) {
				argDate.$gt = req.query.CustomerBeforeDate;
			}

			if (req.query.CustomerAfterDate){
				argDate.$lt =  req.query.CustomerAfterDate;
			}

			if (req.query.CustomerBeforeDate || req.query.CustomerAfterDate){				
				arg.created = argDate;
			}			


			Store.find(arg).populate('user', 'displayName').sort('-created').exec(function(err, stores) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(stores);
				}
			});


};




/**
 * Store middleware
 */
exports.storeByID = function(req, res, next, id) {
	Store.findById(id).populate('user', 'displayName').exec(function(err, store) {
		if (err) return next(err);
		if (!store) return next(new Error('Failed to load store ' + id));
		req.store = store;
		next();
	});
};

/**
 * Store authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.store.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};