const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'user',
	},
	bio: {
		type: String,
	},
	status: {
		type: String,
	},
	lastLogin: {
		type: Date,
	},
});

module.exports = mongoose.model('User', userSchema);
