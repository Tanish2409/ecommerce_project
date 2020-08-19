const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//middlewares and validators
const {
	requireSignin,
	authMiddleware,
	adminMiddleware,
	vendorMiddleware,
} = require('../middleware/auth');
const {
	userSigninValidator,
	userSignupValidator,
} = require('../validators/user');
const { runValidation } = require('../validators/');

/**
 * METHOD : POST
 * ROUTE : /api/signup
 * DESC : Register a new user
 * AUTH : Public
 */

router.post('/signup', userSignupValidator, runValidation, async (req, res) => {
	const { name, email, bio, status, password } = req.body;

	try {
		//check if user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				error: 'User already exists',
			});
		}
		//hash password
		const hashPassword = await bcrypt.hash(password, 10);
		//create a new user
		user = new User({
			name,
			email,
			bio,
			status,
			password: hashPassword,
			lastLogin: Date.now(),
		});
		//save the user in db
		await user.save();

		//generate token
		const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

		//send token
		return res.json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

/**
 * METHOD : POST
 * ROUTE : /api/login
 * DESC : Login a user and send token
 * AUTH : Public
 */

router.post('/login', userSigninValidator, runValidation, async (req, res) => {
	const { email, password } = req.body;

	try {
		//check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				error: 'Invalid credentials',
			});
		}

		//check if password is correct
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(400).json({
				error: 'Invalid Credentials',
			});
		}

		//update login date
		user.lastLogin = Date.now();
		await user.save();

		//generate token and send it
		const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

		return res.status(400).json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

/**
 * METHOD : POST
 * ROUTE : /api/user
 * DESC : Admin can create new user
 * AUTH : Private - only for admins
 */

router.post('/user', requireSignin, adminMiddleware, async (req, res) => {
	const { name, email, bio, status, password, type } = req.body;

	try {
		//check if user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				error: 'User already exists',
			});
		}
		//hash password
		const hashPassword = await bcrypt.hash(password, 10);
		//create a new user
		user = new User({ name, email, bio, status, password: hashPassword, type });
		//save the user in db
		await user.save();

		return res.json({ message: 'User created successfully.' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

module.exports = router;
