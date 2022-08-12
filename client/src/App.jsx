/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './Styles/globals.css';
import Header from './Components/Header';
import Section from './Components/Section';
import Service from './Components/Service';
import DateCompo from './Components/DateCompo';
import Contact from './Components/Contact';
import ToolBar from './Components/ToolBar';
import Reservation from './Components/Reservations';

function App() {
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusiness = async () => {
    try {
      await axios.get(`/businesses`).then(res => {
        setBusiness(res.data.data.business);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchServices = async () => {
    try {
      await axios.get(`/services`).then(res => {
        setServices(res.data.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchBusiness(), fetchServices()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <Router>
      {!isLoading && (
        <div className="App">
          <div className="page-layout page-layout--flex">
            <Header name={business.name} avatar={business.avatar} />
            <Routes>
              <Route
                path="/"
                element={<Section business={business} services={services} />}
              />
              <Route
                path="/service"
                element={<Service services={services} />}
              />
              <Route path="/date" element={<DateCompo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservation/:id" element={<Reservation />} />
            </Routes>
            <ToolBar />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
