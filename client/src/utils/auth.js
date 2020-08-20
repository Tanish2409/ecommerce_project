import axios from 'axios';
import { raiseError } from './error';

axios.defaults.baseURL = 'http://localhost:9000/api/';

export const setToken = (token) => {
	localStorage.setItem('token', token);
};
export const removeToken = () => {
	localStorage.removeItem('token');
};
export const getToken = () => {
	return localStorage.getItem('token');
};

export const setAuthToken = () => {
	const token = getToken();
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export const loadUser = async (auth, setAuth) => {
	const token = setAuthToken();
	try {
		let response = await axios.get('/auth');

		const { user } = response.data;

		setAuth({
			token,
			user,
			isAuthenticated: true,
			isLoading: false,
		});
	} catch (error) {
		authError(auth, setAuth);
	}
};

export const authError = (auth, setAuth) => {
	setAuth({
		...auth,
		token: false,
		isAuthenticated: false,
		isLoading: false,
		user: null,
	});
	removeToken();
};

export const signup = async (data, auth, setAuth) => {
	try {
		let response = await axios.post('/signup', data);
		const token = response.data.token;
		setToken(token);
		loadUser(auth, setAuth);
	} catch (error) {
		if (error.response) {
			raiseError(auth, setAuth, error.response.data.error);
		} else {
			alert('Something went wrong, Please try again');
		}
	}
};

export const login = async (data, auth, setAuth) => {
	try {
		let response = await axios.post('/login', data);
		const token = response.data.token;
		setToken(token);
		loadUser(auth, setAuth);
	} catch (error) {
		console.log(error.response);
		if (error.response) {
			raiseError(auth, setAuth, error.response.data.error);
		} else {
			alert('Something went wrong, Please try again');
		}
	}
};

export const logout = (auth, setAuth) => {
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
