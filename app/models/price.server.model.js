'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Price Schema
 */
var PriceSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	thickness: {
  		type: Number,
  		required: 'Укажите толщину',
  		min: 0.1,
  		max: 200
  	},
	thicknessPrice: {
  		type: Number,
  		required: 'Укажите цену порезки данной толщины'
  	},
  	thicknessPiercePrice: {
  		type: Number,
  		required: 'Укажите цену пробивки данной толщины'
  	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Price', PriceSchema);