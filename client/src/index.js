import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from './contexts/app-context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/:businessid/*" element={<App />} />
      </Routes>
    </Router>
  </AppContextProvider>
);
