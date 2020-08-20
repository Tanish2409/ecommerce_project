import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Navbar from './components/layout/Navbar';
//local
import { loadUser } from './utils/auth';
import { AuthContext } from './context/authContext';
import Home from './components/Home';
import {
	UserProtectedRoute,
	ProtectedRoute,
	VendorProtectedRoute,
	AdminProtectedRoute,
} from './components/auth/authRoutes';
import Dashboard from './components/layout/Dashboard';
import Products from './components/Products';
import ProductInfo from './components/ProductInfo';

const App = () => {
	const [auth, setAuth] = useContext(AuthContext);
	useEffect(() => {
		loadUser(auth, setAuth);
	}, []);
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/login' component={Login} />
				<ProtectedRoute exact path='/dashboard' component={Dashboard} />
				<Route
					exact
					path='/unauthorised'
					render={() => (
						<h3>Unauthorised. Please login with proper credentials.</h3>
					)}
				/>
				<ProtectedRoute exact path='/view/products' component={Products} />
				<ProtectedRoute
					exact
					path='/view/product/:id'
					component={ProductInfo}
				/>
				<Route path='*' render={() => <h1>404 Not Found</h1>} />
			</Switch>
		</Router>
	);
};

export default App;
