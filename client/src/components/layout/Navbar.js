import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
//local
import { AuthContext } from '../../context/authContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = () => {
	const classes = useStyles();
	const { auth, logout } = useContext(AuthContext);

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					{/* <IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
					>
						<MenuIcon />
					</IconButton> */}
					<Box className={classes.title}>
						<Link to='/'>
							<Typography variant='h6'>Demo</Typography>
						</Link>
					</Box>
					{auth.isAuthenticated ? (
						<>
							<Link to='/dashboard'>
								<Button color='inherit'>
									{auth.user?.name.split(' ')[0]}'s Dashboard
								</Button>
							</Link>
							<Button
								color='inherit'
								onClick={() => {
									logout();
								}}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Link to='/signup'>
								<Button color='inherit'>Sign Up</Button>
							</Link>
							<Link to='/login'>
								<Button color='inherit'>Login</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
