const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'active',
		lowercase: true,
	},
});

module.exports = mongoose.model('Category', categorySchema);
