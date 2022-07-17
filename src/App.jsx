import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './Styles/globals.css';
import Header from './Components/Header';
import Section from './Components/Section';
import Service from './Components/Service';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Section />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
