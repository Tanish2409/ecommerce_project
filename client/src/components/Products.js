import React, { useContext, useEffect, useState } from 'react';
//Mui
import { Box, Typography } from '@material-ui/core';
//local
import { ProductContext, ProductProvider } from '../context/productContext';
import Product from './Product';

const ProductConsumer = ({ history }) => {
	const { products, getAllProducts } = useContext(ProductContext);

	useEffect(() => {
		getAllProducts();
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

function Products(props) {
	return (
		<ProductProvider>
			<ProductConsumer {...props} />
		</ProductProvider>
	);
}

export default Products;
