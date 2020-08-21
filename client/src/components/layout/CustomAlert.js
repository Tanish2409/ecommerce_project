import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function CustomizedSnackbars({ open, removeError, type, msg }) {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		removeError();
	};

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={type}>
				{msg}
			</Alert>
		</Snackbar>
	);
}
