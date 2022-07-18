import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './Styles/globals.css';
import Header from './Components/Header';
import Section from './Components/Section';
import Service from './Components/Service';
import Date from './Components/Date';
import Contact from './Components/Contact';
import ToolBar from './Components/ToolBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Section />} />
          <Route path="/service" element={<Service />} />
          <Route path="/date" element={<Date />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToolBar />
      </div>
    </Router>
  );
}

export default App;
