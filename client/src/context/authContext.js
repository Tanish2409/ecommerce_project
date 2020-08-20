import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: null,
		user: null,
		isAuthenticated: false,
		loading: false,
		isError: false,
		errorMessage: '',
	});

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	);
};
