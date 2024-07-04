// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import axios from 'axios';

import LoginForm from './LoginForm';
import CrudPage from './CrudPage';
import RegistrationForm from './RegistrationForm';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const PrivateRoutes = () => {
  const auth = { token: !!localStorage.getItem('token') }; // Check if token exists

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<PrivateRoutes />}>
        <Route path="/crudpage" element={<CrudPage />} />
        </Route>
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
