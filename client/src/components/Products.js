import React, { useEffect, useState } from 'react';
//Mui
import { Box, Typography } from '@material-ui/core';
//local
import { getAllProducts } from '../utils/product';
import Product from './Product';

const Products = ({ history }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getAllProducts(setProducts);
	}, []);
	return (
		<>
			<Typography variant='h5'>List of Products</Typography>
			<Box
				style={{
					minWidth: '200px',
					padding: '3rem',
					display: 'flex',
					flexWrap: 'wrap',
				}}
			>
				{products.length === 0 ? (
					<h5>No products found</h5>
				) : (
					<>
						{products.map((product) => {
							return (
								<Product
									product={product}
									key={product._id}
									history={history}
								/>
							);
						})}
					</>
				)}
			</Box>
		</>
	);
};

export default Products;
