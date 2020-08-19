const { check } = require('express-validator');

// todo : add a check to check if status is one of 'active' or 'deactive' only
exports.productCreateValidator = [
	check('name').trim().not().isEmpty().withMessage('Name is required'),
	check('status').trim().not().isEmpty().withMessage('Status is required'),
	check('brand').trim().not().isEmpty().withMessage('Brand is required'),
	check('category').trim().not().isEmpty().withMessage('Category is required'),
	check('price').trim().not().isEmpty().withMessage('Price is required'),
	check('price').isNumeric().withMessage('Price should be a number'),
	check('quantity').trim().not().isEmpty().withMessage('Quantity is required'),
	check('quantity').isInt().withMessage('Quantity should be an integer number'),
];

//How this validator works is,
//to update you may not send all the fields and
//send specific fields.
//This won't raise any errors
//However, if you send any field, then
//it must not be empty nad pass all other tests.
exports.productUpdateValidator = [
	check(['name', 'status', 'price', 'quantity', 'brand', 'category'])
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('Submited fields must not be empty'),
	check('price').optional().isNumeric().withMessage('Price should be a number'),
	check('quantity')
		.optional()
		.isInt()
		.withMessage('Quantity should be an integer number'),
];
