'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Store Schema
 */
var StoreSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
  	NameAcceptanceInspector: {
		type: String,
		default: '',
		trim: true,
		required: 'Укажите имя приёмщика'
	},
	NameCustomer: {
		type: String,
		default: '',
		trim: true,
		required: 'Укажите имя клиента'
	},
	sheetContent: {type: String,
		default: '',
		trim: true
	}, 
	statuss: {type:Number, default:0},
	articleIdStore: {type:String, default:''},
	sheetIdStore: {type:String, default:''},
  	thickness: {
  		type: Number,
  		 default: 0,
  		required: 'Укажите толщину',
  		min: 0.1,
  		max: 200
  	},
  	widthList: {
  		type: Number,
  		default: 0,
  		required: 'Укажите ширину',
  		min: 1,
  		max: 3000
  	},
 	lengthList: {
 		type: Number,
 		default: 0,
 		required: 'Укажите длинну',
 		min: 1,
  		max: 8000
 	},
 	priseOfList: {type: Number, default: 0},
 	weightList: {type: Number, default: 0},
 	priseKg: {type: Number, default: 0},
 	formList: {type: Boolean,  default: false},


  	post: { 
  		type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
  	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}	
});

mongoose.model('Store', StoreSchema);