import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//Mui
import { Box, Typography } from '@material-ui/core';
//local
import { getAllProducts } from '../../utils/product';
import Product from '../Product';

const AdminDashboard = () => {
	return (
		<>
			<Typography variant='h3'>Admin Dashboard</Typography>
			<Link to='/view/products'>
				<Typography
					variant='h5'
					style={{ color: 'black', marginBottom: '4rem' }}
				>
					View Products
				</Typography>
			</Link>
			<Link to='/create/product'>
				<Typography variant='h5' style={{ color: 'black' }}>
					Create Product
				</Typography>
			</Link>
		</>
	);
};

export default AdminDashboard;
