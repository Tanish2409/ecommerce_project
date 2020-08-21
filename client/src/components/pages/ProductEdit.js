import React, { useEffect, useState, useContext } from 'react';
import { ProductProvider, ProductContext } from '../../context/productContext';
import { BrandProvider, BrandContext } from '../../context/brandContext';
import {
	CategoryProvider,
	CategoryContext,
} from '../../context/categoryContext';

//mui

import {
	TextField,
	Typography,
	Box,
	Button,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	root: {
		width: '50vw',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'cemter',
		alignItems: 'center',
		width: '100%',
	},
	formFields: {
		margin: '1rem',
		width: '100%',
	},
	button: {},
}));

const ProductConsumer = ({ match }) => {
	const classes = useStyles();
	const { product, getProduct, updateProduct } = useContext(ProductContext);
	const { brands, getAllBrands } = useContext(BrandContext);
	const { categories, getAllCategories } = useContext(CategoryContext);
	const [form, setForm] = useState({
		name: product.name,
		price: product.price,
		quantity: product.quantity,
		brand: product?.brand?.name,
		category: product?.category?.name,
		status: product.status,
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		console.log(form);
		e.preventDefault();
		await updateProduct(form, match.params.id);
	};

	useEffect(() => {
		getAllBrands();
		getAllCategories();
		getProduct(match.params.id);
	}, []);

	return (
		<>
			<Box className={classes.root}>
				<Typography variant='h2' align='center'>
					Update Product Details
				</Typography>
				<form
					className={classes.form}
					onSubmit={handleSubmit}
					autoComplete='off'
				>
					<TextField
						label='Name'
						className={classes.formFields}
						value={form.name}
						onChange={handleChange}
						name='name'
						required
					/>
					<TextField
						label='Price'
						className={classes.formFields}
						value={form.price}
						name='price'
						type='number'
						onChange={handleChange}
						required
					/>
					<TextField
						label='Quantity'
						className={classes.formFields}
						value={form.quantity}
						name='quantity'
						type='number'
						onChange={handleChange}
						required
					/>
					<TextField
						label='Brand'
						className={classes.formFields}
						value={form.brand?._id}
						name='brand'
						onChange={handleChange}
						select
					>
						{brands.map((brand) => {
							return <MenuItem value={brand?._id}>{brand?.name}</MenuItem>;
						})}
					</TextField>
					<TextField
						label='Category'
						className={classes.formFields}
						value={product.category?._id}
						name='category'
						onChange={handleChange}
						select
					>
						{categories.map((category) => {
							return (
								<MenuItem value={category?._id}>{category?.name}</MenuItem>
							);
						})}
					</TextField>

					<TextField
						label='Status'
						className={classes.formFields}
						value={form.status}
						name='status'
						onChange={handleChange}
						select
					>
						<MenuItem value='active'>Active</MenuItem>
						<MenuItem value='deactive'>Deactive</MenuItem>
					</TextField>
					<Button
						color='primary'
						fullWidth={false}
						variant='outlined'
						type='submit'
					>
						<Typography variant='button'>Update</Typography>
					</Button>
				</form>
			</Box>
		</>
	);
};

const ProductEdit = (props) => {
	return (
		<BrandProvider>
			<CategoryProvider>
				<ProductProvider>
					<ProductConsumer {...props} />
				</ProductProvider>
			</CategoryProvider>
		</BrandProvider>
	);
};

export default ProductEdit;
