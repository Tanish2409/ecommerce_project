import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function CustomizedSnackbars({ initialState, setError, type }) {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setError({
			...initialState,
			isError: false,
			errorMessage: '',
		});
	};

	return (
		<Snackbar
			open={initialState.isError}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity={type}>
				{initialState.errorMessage}
			</Alert>
		</Snackbar>
	);
}
