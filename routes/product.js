const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');
//middlewares and validator
const {
	requireSignin,
	authMiddleware,
	vendorMiddleware,
} = require('../middleware/auth');
const {
	productCreateValidator,
	productUpdateValidator,
} = require('../validators/product');
const { runValidation } = require('../validators/');

/**
 * METHOD : GET
 * ROUTE : /api/products/
 * DESC : All the users can list the procuts ( admins and normal user can list all | vendors can only list their products)
 * AUTH : Private - for authenticated users
 **/

router.get('/products', requireSignin, authMiddleware, async (req, res) => {
	const { userId } = req.user;

	try {
		let user = await User.findById(userId);

		//check if the user is vender
		//and if user is vendor then send only products created by him
		if (user.type === 'vendor') {
			let products = await Product.find({ postedBy: userId });

			return res.json({ products });
		}

		//otherwise if user is admin or normal user, then send all the products
		let products = await Product.find({});
		return res.json({ products });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again !' });
	}
});

/**
 * METHOD : GET
 * ROUTE : /api/product/:id
 * DESC : Get details about the specific product
 * AUTH : Private - for authenticated users
 **/

router.get('/product/:id', requireSignin, authMiddleware, async (req, res) => {
	const productId = req.params.id;
	const { userId } = req.user;

	try {
		let user = await User.findById(userId);
		let product = await Product.findById(productId);

		//check if product exists
		if (!product) {
			return res.status(400).json({ error: 'Product does not exists.' });
		}

		//check if the user is vender
		//and if user is vendor then only send the queried product details created by same vendor
		if (user.type === 'vendor') {
			//check if product exists posted by same vendor
			product = await Product.findOne({ postedBy: userId });
			if (product) {
				return res.json({ product });
			}

			return res.status(400).json({
				error: 'Unauthorised to perform this action. ',
			});
		}

		return res.json({ product });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again !' });
	}
});

/**
 * METHOD : POST
 * ROUTE : /api/product
 * DESC : Create a new product
 * AUTH : Private - for admins and vendors only
 **/

router.post(
	'/product',
	requireSignin,
	vendorMiddleware,
	productCreateValidator,
	runValidation,
	async (req, res) => {
		const { userId } = req.user;
		const { name, price, quantity, brand, category, status } = req.body;
		try {
			let product = new Product({
				name,
				price,
				quantity,
				brand,
				category,
				status,
				postedBy: userId,
			});
			await product.save();
			return res.json({ message: 'Product created successfully.' });
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

/**
 * METHOD : PATCH
 * ROUTE : /api/product/:id
 * DESC : Update a specific product
 * AUTH : Private - for vendors and admins
 **/

router.patch(
	'/product/:id',
	requireSignin,
	vendorMiddleware,
	productUpdateValidator,
	runValidation,
	async (req, res) => {
		const productId = req.params.id;
		const { userId } = req.user;
		const { name, status, price, quantity, brand, category } = req.body;

		try {
			const user = await User.findById(userId);
			let product = await Product.findById(productId);

			//check if product exists
			if (!product) {
				return res.status(400).json({ error: 'Product does not exists.' });
			}

			//check if the user is vendor
			if (user.type === 'vendor') {
				//if it is vendor then check product being updated
				//is posted by the same vendor
				if (userId === product.postedBy.toString()) {
					await Product.findByIdAndUpdate(
						productId,
						{
							$set: {
								name,
								status,
								price,
								quantity,
								brand,
								category,
							},
						},
						{ omitUndefined: true }
					);

					return res.json({ message: 'Product updated successfully' });
				}
				//if not then return without updating
				return res.status(400).json({
					error: 'Unauthorised to perform this action',
				});
			}

			//otherwise if the user is not vendor, then
			//it must be admin, thus admin can update any
			//product

			await Product.findByIdAndUpdate(
				productId,
				{
					$set: {
						name,
						status,
						price,
						quantity,
						brand,
						category,
					},
				},
				{ omitUndefined: true }
			);

			return res.json({ message: 'Product updated successfully' });
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

/**
 * METHOD : DELETE
 * ROUTE : /api/product/:id
 * DESC : Delete a specific product
 * AUTH : Private - for vendors and admins
 **/

router.delete(
	'/product/:id',
	requireSignin,
	vendorMiddleware,
	async (req, res) => {
		const productId = req.params.id;
		const { userId } = req.user;

		try {
			const user = await User.findById(userId);
			let product = await Product.findById(productId);

			//check if product exists
			if (!product) {
				return res.status(400).json({ error: 'Product does not exists.' });
			}

			//check if the user is vendor
			if (user.type === 'vendor') {
				//if it is vendor then check product being deleted
				//is posted by the same vendor
				if (userId === product.postedBy.toString()) {
					await Product.findByIdAndDelete(productId);

					return res.json({ message: 'Product deleted successfully' });
				}
				//if not then return without deleting
				return res.status(400).json({
					error: 'Unauthorised to perform this action',
				});
			}

			//otherwise if the user is not vendor, then
			//it must be admin, thus admin can delete any
			//product

			await Product.findByIdAndDelete(productId);

			return res.json({ message: 'Product deleted successfully' });
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

module.exports = router;
