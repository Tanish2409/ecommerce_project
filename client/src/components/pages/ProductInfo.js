import React, { useContext, useEffect, useState } from 'react';
//MUI
import { Box } from '@material-ui/core';
//local
import Product from '../Product';
import { ProductContext, ProductProvider } from '../../context/productContext';

const ProductConsumer = ({ match }) => {
	const { product, getProduct } = useContext(ProductContext);

	useEffect(() => {
		getProduct(match.params.id);
	}, []);

	return (
		<Box
			p={3}
			display='flex'
			justifyContent='center'
			alignItems='center'
			width='100vw'
			height='50vh'
		>
			{product ? <Product product={product} /> : <h5>Loading...</h5>}
		</Box>
	);
};

const ProductInfo = (props) => {
	return (
		<ProductProvider>
			<ProductConsumer {...props} />
		</ProductProvider>
	);
};

export default ProductInfo;
