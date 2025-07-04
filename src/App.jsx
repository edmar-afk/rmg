import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/admin/Dashboard';
import Customers from "./pages/admin/Customers";
import Bookings from "./pages/admin/Bookings";
import WorkerSchedules from './pages/admin/WorkerSchedules';
import UnregisteredUsers from './pages/admin/UnregisteredUsers';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
		<>
			<Routes>
				<Route
					exact
					path="/"
					element={<Dashboard />}
				/>
				<Route
					exact
					path="/admin/customers"
					element={<Customers />}
				/>
				<Route
					exact
					path="/admin/booking"
					element={<Bookings />}
				/>
				<Route
					exact
					path="/admin/worker-schedules"
					element={<WorkerSchedules />}
				/>
				<Route
					exact
					path="/admin/unregistered-users"
					element={<UnregisteredUsers />}
				/>
			</Routes>
		</>
	);
}

export default App;
