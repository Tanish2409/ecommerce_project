import axios from 'axios';

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
