const expressJWT = require('express-jwt');
const User = require('../models/User');

//validate JWT token
exports.requireSignin = expressJWT({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

//enable Private routes for all type of users
exports.authMiddleware = async (req, res, next) => {
	const { userId } = req.user;

	try {
		let user = await User.findById({ _id: userId });
		if (!user) {
			return res.status(400).json({
				error: 'Unauthorised Access',
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
};

//enable private routes for vendors and admins
exports.vendorMiddleware = async (req, res, next) => {
	const { userId } = req.user;

	try {
		let user = await User.findById({ _id: userId });

		if (!user || user.type === 'user') {
			return res.status(400).json({
				error: 'Unauthorised Access',
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
};

//enable private routes only for admins
exports.adminMiddleware = async (req, res, next) => {
	const { userId } = req.user;

	try {
		let user = await User.findById({ _id: userId });

		if (!user || user.type !== 'admin') {
			return res.status(400).json({
				error: 'Unauthorised Access',
			});
		}

		res.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
};
