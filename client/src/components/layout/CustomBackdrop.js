import React, { useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//local
import { AuthContext } from '../../context/authContext';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

export default function SimpleBackdrop() {
	const { auth } = useContext(AuthContext);
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={auth.isLoading}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
}
