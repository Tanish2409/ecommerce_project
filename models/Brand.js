const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Brand', brandSchema);
