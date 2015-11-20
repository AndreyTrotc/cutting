'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	NameCustomerCreate: {
		type: String,
		lowercase: true,
		default: '',
		trim: true,
		required: 'Имя закзчика должно быть заполнено'
	},
	discount:{ type: Number, default:0},
	sheet:[{thicknessCreate:{type:Number, default:0},
			widthListCreate:{type:Number, default:0},
			lengthListCreate:{type:Number, default:0},
			formListCreate:{type: Boolean,  default: false},
			meterCut:{type:Number, default:0},
			pierceAmount:{type:Number, default:0},
			priseCut:{type:Number, default:0},
			weighMetal:{type:Number, default:0},
			priseStoreMetalKg:{type:Number, default:0},
			priseSaleMetalKg:{type:Number, default:0},
			priseSaleMetal:{type:Number, default:0},
			amountSheet:{type:Number, default:0},
			NamePr:{type: String,  default: ''},
			sheetCut:{type: Boolean,  default: false}
	 }],
	arrResFullPrice:{ type : Array , 'default' : [] },
	NameAcceptanceOrder: {
		type: String,
		lowercase: true,
		default: '',
		required: 'Имя принявшего заказ должно быть заполнено'
	},
	sheetCut: {type: Boolean,  default: false},
	prodSheepment: {type: Boolean,  default: false},
	restSheepment: {type: Boolean,  default: false},
	invoiseCompl: {type: Boolean,  default: false},
	invoisePaid: {type: Boolean,  default: false},
	formSale: {type: Boolean,  default: false},
	contentArticle: {type: String,  default: ''},
	post: { 
  		type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
  	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);