const router = require('express').Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
//middlewares and validators
const {
	requireSignin,
	vendorMiddleware,
	adminMiddleware,
} = require('../middleware/auth');
const {
	categoryCreateValidator,
	categoryUpdateValidator,
} = require('../validators/category');
const { runValidation } = require('../validators');

/**
 * METHOD : GET
 * ROUTE : /api/categories/
 * DESC : Admins and vendors can get the list of all the categories
 * AUTH : Private - only for admins and vendors
 **/

router.get('/categories', requireSignin, vendorMiddleware, async (req, res) => {
	try {
		let categories = await Category.find({});

		return res.json({ categories });
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: 'Something went wrong !',
		});
	}
});

/**
 * METHOD : POST
 * ROUTE : /api/category/
 * DESC : Admins can create a new category
 * AUTH : Private - only for admins
 **/
router.post(
	'/category',
	requireSignin,
	adminMiddleware,
	categoryCreateValidator,
	runValidation,
	async (req, res) => {
		const { name, status } = req.body;

		try {
			const category = new Category({ name, status });

			await category.save();
			return res.json({ message: 'Category created successfully' });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

/**
 * METHOD : PATCH
 * ROUTE : /api/category/:id
 * DESC : Admins can update category details
 * AUTH : Private - only for admins
 **/
router.patch(
	'/category/:id',
	requireSignin,
	adminMiddleware,
	categoryUpdateValidator,
	runValidation,
	async (req, res) => {
		const { name, status } = req.body;
		const categoryId = req.params.id;

		try {
			await Category.findByIdAndUpdate(
				categoryId,
				{
					$set: {
						name,
						status,
					},
				},
				{ omitUnidentified: true }
			);

			return res.json({
				message: 'Category updated successfully',
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

/**
 * METHOD : DELETE
 * ROUTE : /api/category/:id
 * DESC : Admins can delete a category
 * AUTH : Private - only for admins
 **/
router.delete(
	'/category/:id',
	requireSignin,
	adminMiddleware,
	async (req, res) => {
		try {
			//check if category already exists
			let category = await Category.findById(req.params.id);
			if (!category) {
				return res.json({
					error: 'Category does not exists',
				});
			}
			//Find and delete products associated with category being deleted
			await Product.deleteMany({ category: category._id });
			//Delete the category
			await Category.findByIdAndDelete(req.params.id);

			return res.json({ message: 'Category deleted successfully' });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

module.exports = router;
