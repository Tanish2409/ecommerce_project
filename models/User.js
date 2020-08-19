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
		lowercase: true,
	},
	bio: {
		type: String,
	},
	status: {
		type: String,
		default: 'active',
		lowercase: true,
	},
	lastLogin: {
		type: Date,
	},
});

module.exports = mongoose.model('User', userSchema);
