import React, { useState, useEffect, useContext } from 'react';
//MUI
import { TextField, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomAlert from '../layout/CustomAlert';
// local imports
import { AuthContext } from '../../context/authContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	root: {
		width: '50vw',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'cemter',
		alignItems: 'center',
		width: '100%',
	},
	formFields: {
		margin: '1rem',
		width: '100%',
	},
	button: {},
}));

const Login = () => {
	const classes = useStyles();

	const { login, removeAuthError, auth } = useContext(AuthContext);

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(form);
	};

	useEffect(() => {
		removeAuthError();
	}, []);

	return (
		<>
			{auth.isAuthenticated ? (
				<Redirect to='/' />
			) : (
				<Box className={classes.root}>
					<Typography variant='h2' align='center'>
						Login
					</Typography>
					<CustomAlert
						open={auth.isError}
						removeError={removeAuthError}
						type='error'
						msg={auth.errorMessage}
					/>
					<form
						className={classes.form}
						onSubmit={handleSubmit}
						autoComplete='off'
					>
						<TextField
							label='Email'
							className={classes.formFields}
							value={form.email}
							name='email'
							onChange={handleChange}
							type='email'
							required
						/>
						<TextField
							label='Password'
							className={classes.formFields}
							value={form.password}
							type='password'
							name='password'
							onChange={handleChange}
							required
						/>

						<Button
							color='primary'
							fullWidth={false}
							variant='outlined'
							type='submit'
						>
							<Typography variant='button'>Login</Typography>
						</Button>
					</form>
				</Box>
			)}
		</>
	);
};

export default Login;
