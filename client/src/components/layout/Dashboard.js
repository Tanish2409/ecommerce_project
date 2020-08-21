import React, { useContext, useEffect } from 'react';
//local
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import VendorDashboard from '../pages/VendorDashboard';

import { AuthContext } from '../../context/authContext';
const Dashboard = () => {
	const { auth } = useContext(AuthContext);
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
