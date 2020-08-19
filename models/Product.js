const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'active',
		lowercase: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	postedBy: {
		type: ObjectId,
		ref: 'User',
		required: true,
	},
	brand: {
		type: ObjectId,
		ref: 'Brand',
		required: true,
	},
	category: {
		type: ObjectId,
		ref: 'Category',
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);
