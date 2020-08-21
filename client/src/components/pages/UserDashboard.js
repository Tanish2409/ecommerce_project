import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//Mui
import { Box, Typography } from '@material-ui/core';
//local
import { getAllProducts } from '../../utils/product';
import Product from '../Product';

const UserDashboard = () => {
	return (
		<>
			<Link to='/view/products'>
				<Typography variant='h5' style={{ color: 'black' }}>
					View Products
				</Typography>
			</Link>
		</>
	);
};

export default UserDashboard;
