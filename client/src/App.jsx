import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './Styles/globals.css';
import Header from './Components/Header';
import Section from './Components/Section';
import Service from './Components/Service';
import CDate from './Components/Date';
import Contact from './Components/Contact';
import ToolBar from './Components/ToolBar';

function App() {
  const [business, setBusiness] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusiness = async () => {
    try {
      await axios.get(`http://localhost:5000/businesses`).then(res => {
        setBusiness(res.data.data.business);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchBusiness();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header name={business.name} avatar={business.avatar} />
        <Routes>
          <Route
            path="/"
            element={<Section business={business} isLoading={isLoading} />}
          />
          <Route path="/service" element={<Service />} />
          <Route path="/date" element={<CDate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToolBar />
      </div>
    </Router>
  );
}

export default App;
