import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
//mui
import { Typography, Box } from '@material-ui/core';

//Local
import { AuthContext } from '../context/authContext';

const Home = () => {
	const [auth, setAuth] = useContext(AuthContext);
	return (
		<>
			{auth.isAuthenticated ? (
				<Redirect to='/dashboard' />
			) : (
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<Typography variant='h2'>Welcome</Typography>
					<Typography variant='body1'>
						Please login/signup to continue
					</Typography>
				</Box>
			)}
		</>
	);
};

export default Home;
