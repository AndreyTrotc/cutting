'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	nameCustomer: {
		type: String,
		default: '',
		trim: true,		
		lowercase: true,
		required: 'Имя клиента обязательно для запонения'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	discount:{
		type: Number,
		default:0
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Customer', CustomerSchema);