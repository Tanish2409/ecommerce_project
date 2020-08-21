import React, { useContext } from 'react';
//mui
import { Paper, Box, Typography, Avatar, Button } from '@material-ui/core';
import { ProductContext } from '../context/productContext';

const Product = ({ product, history = undefined }) => {
	const { deleteProduct } = useContext(ProductContext);
	return (
		<Paper
			elevation={2}
			style={{
				width: 'auto',
				height: 'auto',
				padding: '2rem',
				display: 'inline-block',
				marginRight: '2rem',
				marginBottom: '2rem',
			}}
		>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
			>
				<Avatar style={{ marginBottom: '1rem' }}>Img</Avatar>
				<Typography varriant='body1' gutterBottom={true}>
					{product?.name}
				</Typography>
				<Typography varriant='body1' gutterBottom={true}>
					Brand : {product?.brand?.name}
				</Typography>
				<Typography varriant='body1' gutterBottom={true}>
					Category: {product?.category?.name}
				</Typography>
				{history ? (
					<Button
						variant='outlined'
						color='primary'
						fullWidth={true}
						style={{ marginBottom: '1rem' }}
						onClick={() => history.push(`/view/product/${product?._id}`)}
					>
						Info
					</Button>
				) : null}

				<Button
					variant='outlined'
					color='primary'
					fullWidth={true}
					style={{ marginBottom: '1rem' }}
					onClick={() => history.push(`/edit/product/${product?._id}`)}
				>
					Edit
				</Button>
				<Button
					variant='outlined'
					color='secondary'
					fullWidth={true}
					onClick={() => {
						deleteProduct(product?._id);
					}}
				>
					Delete
				</Button>
			</Box>
		</Paper>
	);
};

export default Product;
