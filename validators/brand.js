const { check } = require('express-validator');

// todo : add a check to check if status is one of 'active' or 'deactive' only
exports.brandCreateValidator = [
	check('name').trim().not().isEmpty().withMessage('Name is required'),
	check('status').trim().not().isEmpty().withMessage('Status is required'),
];

//How this validator works is,
//to update you may not send all the fields and
//send specific fields.
//This won't raise any errors
//However, if you send any field, then
//it must not be empty nad pass all other tests.y
exports.brandUpdateValidator = [
	check(['name', 'status'])
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('Submited fields must not be empty'),
];
