import Axios from 'axios';
import React, { useState, createContext } from 'react';
import { removeToken, setAuthToken, setToken } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: null,
		user: null,
		isAuthenticated: false,
		isLoading: true,
		isError: false,
		errorMessage: '',
	});

	//fetch and load the details of logged in users
	const loadUser = async () => {
		const token = setAuthToken();
		try {
			let response = await Axios.get('/auth');

			const { user } = response.data;

			setAuth({
				...auth,
				token,
				user,
				isAuthenticated: true,
				isLoading: false,
				isError: false,
				errorMessage: '',
			});
		} catch (error) {
			authError();
		}
	};

	//delete the token from localStrorage and user from global state
	const authError = () => {
		setAuth({
			...auth,
			token: null,
			isAuthenticated: false,
			isLoading: false,
			user: null,
		});
		removeToken();
	};

	//display error if any
	const raiseAuthError = (msg) => {
		setAuth({
			...auth,
			isError: true,
			errorMessage: msg,
		});
	};

	//remove error message
	const removeAuthError = () => {
		setAuth({
			...auth,
			isError: false,
			errorMessage: '',
		});
	};
	//signup user
	const signup = async (data) => {
		try {
			let response = await Axios.post('/signup', data);
			const token = response.data.token;

			setToken(token);

			await loadUser();
		} catch (error) {
			if (error.response) {
				raiseAuthError(error.response.data.error);
			} else {
				alert('Something went wrong, Pleae try agian!');
			}
		}
	};

	// login user
	const login = async (data) => {
		try {
			let response = await Axios.post('/login', data);

			const token = response.data.token;

			setToken(token);

			await loadUser();
		} catch (error) {
			if (error.response) {
				raiseAuthError(error.response.data.error);
			} else {
				alert('Something went wrong, Pleae try agian!');
			}
		}
	};

	//logout user
	const logout = () => {
		setAuth({
			...auth,
			token: null,
			user: null,
			isAuthenticated: false,
			isLoading: false,
			isError: false,
			errorMessage: '',
		});
		removeToken();
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				loadUser,
				signup,
				login,
				logout,
				raiseAuthError,
				removeAuthError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
