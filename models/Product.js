const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
	},
	postedBy: {
		type: ObjectId,
		ref: 'User',
	},
	brand: {
		type: ObjectId,
		ref: 'Brand',
	},
	category: {
		type: ObjectId,
		ref: 'Category',
	},
});

module.exports = mongoose.model('Product', productSchema);
