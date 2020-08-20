import React from 'react';
//mui
import { Paper, Box, Typography, Avatar, Button } from '@material-ui/core';

const Product = ({ product, history = undefined }) => {
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
				>
					Edit
				</Button>
				<Button variant='outlined' color='secondary' fullWidth={true}>
					Delete
				</Button>
			</Box>
		</Paper>
	);
};

export default Product;
