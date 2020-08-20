const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//middlewares and validators
const { requireSignin, adminMiddleware } = require('../middleware/auth');
const {
	userSigninValidator,
	userSignupValidator,
	userUpdateValidator,
	userCreateValidator,
} = require('../validators/user');
const { runValidation } = require('../validators/');

/**
 * METHOD : POST
 * ROUTE : /api/signup
 * DESC : Register a new user
 * AUTH : Public
 */

router.post('/signup', userSignupValidator, runValidation, async (req, res) => {
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
		user = new User({
			name,
			email,
			bio,
			status,
			type,
			password: hashPassword,
			lastLogin: Date.now(),
		});
		//save the user in db
		user = await user.save();

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
 * ROUTE : /api/user
 * DESC : Admin can create new user
 * AUTH : Private - only for admins
 */

router.post(
	'/user',
	requireSignin,
	adminMiddleware,
	userCreateValidator,
	runValidation,
	async (req, res) => {
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
			user = new User({
				name,
				email,
				bio,
				status,
				password: hashPassword,
				type,
			});
			//save the user in db
			await user.save();

			return res.json({ message: 'User created successfully.' });
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error: 'Something went wrong. Please try again !',
			});
		}
	}
);

/**
 * METHOD : GET
 * ROUTE : /api/users
 * DESC : Admin can list all users
 * AUTH : Private - only for admins
 **/
router.get('/users', requireSignin, adminMiddleware, async (req, res) => {
	try {
		let users = await User.find({}).select('-password');

		return res.json({ users });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

/**
 * METHOD : GET
 * ROUTE : /api/user/:id
 * DESC : Admin can get the deails of signle user
 * AUTH : Private - only for admins
 **/
router.get('/user/:id', requireSignin, adminMiddleware, async (req, res) => {
	const userId = req.params.id;
	try {
		let user = await User.findById(userId).select('-password');

		if (!user) {
			return res.status(400).json({
				error: 'User does not exists.',
			});
		}

		return res.json({ user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

/**
 * METHOD : PATCH
 * ROUTE : /api/user/:id
 * DESC : Admin can update all the user details
 * AUTH : Private - only for admins
 **/
router.patch(
	'/user/:id',
	requireSignin,
	adminMiddleware,
	userUpdateValidator,
	runValidation,
	async (req, res) => {
		const userId = req.params.id;
		let { name, email, type, bio, status, password } = req.body;

		try {
			//check if email already exists if the admin tries to update email
			if (email) {
				let user = await User.findOne({ email });

				if (user) {
					return res
						.status(400)
						.json({ error: 'User with that email aready exists' });
				}
			}
			//hash the new password
			password = await bcrypt.hash(password, 10);
			//update user details
			await User.findByIdAndUpdate(
				userId,
				{
					$set: { name, email, type, bio, status, password },
				},
				{ new: true, omitUndefined: true }
			);

			return res.json({ message: 'User details updated successfully!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error: 'Something went wrong. Please try again !',
			});
		}
	}
);

/**
 * METHOD : DELETE
 * ROUTE : /api/user/:id
 * DESC : Admin can delete a user
 * AUTH : Private - only for admins
 **/
router.delete('/user/:id', requireSignin, adminMiddleware, async (req, res) => {
	const userId = req.params.id;

	try {
		//check if user exists
		let user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				error: 'User does not exists',
			});
		}
		//check if the user to be deleted is admin
		if (user.type === 'admin') {
			return res.status(400).json({
				error: 'Action denied. User is also an admin.',
			});
		}

		//check if the user is vendor
		//then delete that vendor's products
		if (user.type === 'vendor') {
			await Product.deleteMany({ postedBy: userId });
		}

		//Delete the user
		await User.findByIdAndDelete(userId);

		return res.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again !',
		});
	}
});

module.exports = router;
