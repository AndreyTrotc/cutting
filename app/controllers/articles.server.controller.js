'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Article = mongoose.model('Article'),
	Price = mongoose.model('Price'),
	Store = mongoose.model('Store'),
	Customer = mongoose.model('Customer'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;
	
	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {

	var arg= {},
		argDate = {};	

	if (req.query.arhive === 'true'){
		arg.prodSheepment = true;
		arg.restSheepment = true;
		arg.invoisePaid = true;
		arg.sheetCut = true;
	} else {
		arg = {$or: [{prodSheepment: false},{restSheepment:false},{invoisePaid:false},{sheetCut:false}]};				
	}

	if (req.query.NameCustomerSelect) {
		arg.NameCustomerCreate = req.query.NameCustomerSelect;
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


	Article.find(arg).sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});	
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};