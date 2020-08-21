import React, { useContext, useEffect, useState } from 'react';
//MUI
import { Box } from '@material-ui/core';
//local
import Product from '../Product';
import { ProductContext, ProductProvider } from '../../context/productContext';

const ProductConsumer = ({ match, history }) => {
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
			height='calc(100vh - 64px)'
		>
			{product ? (
				<Product product={product} history={history} />
			) : (
				<h5>Loading...</h5>
			)}
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
