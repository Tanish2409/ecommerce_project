import React, { useState, useEffect, useContext } from 'react';
//MUI
import {
	TextField,
	Typography,
	Box,
	Button,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomAlert from '../layout/CustomAlert';
// local imports
import { signup } from '../../utils/auth';
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

const SignUp = () => {
	const classes = useStyles();

	const { auth, signup, removeAuthError, raiseAuthError } = useContext(
		AuthContext
	);

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		type: 'user',
		status: 'active',
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(form);
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
						Sign Up
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
							label='Name'
							className={classes.formFields}
							value={form.name}
							onChange={handleChange}
							name='name'
							required
						/>
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
						<TextField
							label='Type'
							className={classes.formFields}
							value={form.type}
							name='type'
							onChange={handleChange}
							select
						>
							<MenuItem value='user'>User</MenuItem>
							<MenuItem value='vendor'>Vendor</MenuItem>
						</TextField>
						<Button
							color='primary'
							fullWidth={false}
							variant='outlined'
							type='submit'
						>
							<Typography variant='button'>sign up</Typography>
						</Button>
					</form>
				</Box>
			)}
		</>
	);
};

export default SignUp;
