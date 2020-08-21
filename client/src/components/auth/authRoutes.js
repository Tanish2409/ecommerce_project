import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
//local
import { AuthContext } from '../../context/authContext';

export const UserProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.user?.type === 'user') {
					return <Component {...props} />;
				} else {
					return <Redirect to='/unauthorised' />;
				}
			}}
		/>
	);
};
export const VendorProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.user?.type === 'vendor') {
					return <Component {...props} />;
				} else {
					return <Redirect to='/unauthorised' />;
				}
			}}
		/>
	);
};
export const AdminProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.user?.type === 'admin') {
					return <Component {...props} />;
				} else {
					return <Redirect to='/unauthorised' />;
				}
			}}
		/>
	);
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.isAuthenticated) {
					return <Component {...props} />;
				} else {
					return <Redirect to='/unauthorised' />;
				}
			}}
		/>
	);
};
