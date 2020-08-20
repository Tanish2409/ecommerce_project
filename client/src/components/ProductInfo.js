import React, { useEffect, useState } from 'react';
//MUI
import { Box } from '@material-ui/core';
//local
import { getProduct } from '../utils/product';
import Product from './Product';

const ProductInfo = ({ match }) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getProduct(setProduct, match.params.id);
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

export default ProductInfo;
