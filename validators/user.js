const { check } = require('express-validator');

//todo : add a check to check if the status is one of 'active' or 'deactive' only. Same for type also ( 'user', 'vendor', 'admin' )
exports.userSignupValidator = [
	check('name').trim().not().isEmpty().withMessage('Name is required'),
	check('status')
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('Status can not be empty'),
	check('bio')
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('bio can not be empty'),
	check('name').trim().not().isEmpty().withMessage('Name is required'),
	check('email').isEmail().withMessage('Must be a valid Email address'),
	check('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Password must not be empty.'),
];

exports.userCreateValidator = [
	check('name').trim().not().isEmpty().withMessage('Name is required'),
	check('email').isEmail().withMessage('Must be a valid Email address'),
	check('status')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Status must not be empty'),
	check('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Password must not be empty.'),
	check('type').trim().not().isEmpty().withMessage('type is required'),
];

exports.userSigninValidator = [
	check('email').isEmail().withMessage('Must be a valid Email address'),
	check('password').trim().not().isEmpty().withMessage('Password is required'),
];

//How this validator works is,
//to update you may not send all the fields and
//send specific fields.
//This won't raise any errors
//However, if you send any field, then
//it must not be empty nad pass all other tests.
exports.userUpdateValidator = [
	check(['email', 'name', 'type', 'status', 'password', 'bio'])
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('Submited fields must not be empty'),
	check('email')
		.optional()
		.isEmail()
		.withMessage('Must be a valid email address'),
];
