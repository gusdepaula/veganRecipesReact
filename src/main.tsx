import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Admin from './components/Admin';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
