import React, { useState, createContext } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ childern }) => {
	const [alert, setAlert] = useState({
		showAlert: false,
		alertMessage: '',
	});

	const raiseAlert = (msg, type) => {
		setAlert({
			showAlert: true,
			alertMessage: msg,
		});
	};

	const removeAlert = () => {
		setAlert({
			showAlert: false,
			alertMessage: '',
		});
	};

	return (
		<AlertContext.Provider value={(raiseAlert, removeAlert)}>
			{children}
		</AlertContext.Provider>
	);
};
