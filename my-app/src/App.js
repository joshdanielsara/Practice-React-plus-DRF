import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import LoginForm from './LoginForm';
import CrudPage from './CrudPage';
import RegistrationForm from './RegistrationForm';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/crudpage" element={<CrudPage />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}


function Josh(){
  return( 

    <h1>Hello</h1>
  );
}






export default function WrappedApp() {
  return (
    <>
    <Josh />
    <Router>
      <App />
    </Router>
    </>
  );
}
