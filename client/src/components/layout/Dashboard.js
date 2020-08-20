import React, { useContext } from 'react';
//local
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';

import { AuthContext } from '../../context/authContext';
const Dashboard = () => {
	const [auth, setAuth] = useContext(AuthContext);
	return (
		<>
			{auth.user?.type === 'user' ? (
				<UserDashboard />
			) : auth.user?.type === 'vendor' ? (
				<VendorDashboard />
			) : (
				<AdminDashboard />
			)}
		</>
	);
};

export default Dashboard;
