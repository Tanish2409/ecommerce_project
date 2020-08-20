const router = require('express').Router();
const User = require('../models/User');
//middlewares
const { requireSignin, authMiddleware } = require('../middleware/auth');

/**
 * METHOD : GET
 * ROUTE : /api/auth
 * DESC : get authenticated user details
 * AUTH : Private - for authenticated users
 **/

router.get('/auth', requireSignin, authMiddleware, async (req, res) => {
	const { userId } = req.user;

	try {
		const user = await User.findById(userId).select('-password');

		if (!user) {
			return res.status(400).json({
				error: 'User does not exists.',
			});
		}

		return res.json({ user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Something went wrong. Please try again later.',
		});
	}
});

module.exports = router;
