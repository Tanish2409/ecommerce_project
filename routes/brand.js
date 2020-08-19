const router = require('express').Router();
const Brand = require('../models/Brand');
const Product = require('../models/Product');
//middlewares and validators
const {
	requireSignin,
	vendorMiddleware,
	adminMiddleware,
} = require('../middleware/auth');
const {
	brandCreateValidator,
	brandUpdateValidator,
} = require('../validators/brand');
const { runValidation } = require('../validators');
/**
 * METHOD : GET
 * ROUTE : /api/brands/
 * DESC : Admins and vendors can get the list of all the brands
 * AUTH : Private - only for admins and vendors
 **/

router.get('/brands', requireSignin, vendorMiddleware, async (req, res) => {
	try {
		let brands = await Brand.find({});

		return res.json({ brands });
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: 'Something went wrong !',
		});
	}
});

/**
 * METHOD : POST
 * ROUTE : /api/brand/
 * DESC : Admins can create a new brand
 * AUTH : Private - only for admins
 **/
router.post(
	'/brand',
	requireSignin,
	adminMiddleware,
	brandCreateValidator,
	runValidation,
	async (req, res) => {
		const { name, status } = req.body;

		try {
			const brand = new Brand({ name, status });
			await brand.save();
			return res.json({ message: 'Brand created successfully' });
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
 * ROUTE : /api/brand/:id
 * DESC : Admins can update brand details
 * AUTH : Private - only for admins
 **/
router.patch(
	'/brand/:id',
	requireSignin,
	adminMiddleware,
	brandUpdateValidator,
	runValidation,
	async (req, res) => {
		const { name, status } = req.body;
		const brandId = req.params.id;

		try {
			await Brand.findByIdAndUpdate(
				brandId,
				{
					$set: {
						name,
						status,
					},
				},
				{ omitUnidentified: true }
			);

			return res.json({
				message: 'Brand updated successfully',
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
 * ROUTE : /api/brand/:id
 * DESC : Admins can delete a brand
 * AUTH : Private - only for admins
 **/
router.delete(
	'/brand/:id',
	requireSignin,
	adminMiddleware,
	async (req, res) => {
		try {
			//check if brand exists
			let brand = await Brand.findById(req.params.id);
			if (!brand) {
				return res.json({
					error: 'Brand does not exists',
				});
			}

			//Find and delete products associated with brand being deleted
			await Product.deleteMany({ brand: brand._id });
			//Delete the brand
			await Brand.findByIdAndDelete(req.params.id);

			return res.json({ message: 'Brand deleted successfully' });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again !' });
		}
	}
);

module.exports = router;
