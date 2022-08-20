/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from 'react-router-dom';
import axios from 'axios';
import './Styles/globals.css';
import Home from './pages/Home/Home';
import Service from './pages/Service/Service';
import DateCompo from './pages/Date/DateCompo';
import Contact from './pages/Contact/Contact';
import Reservation from './pages/Reservation/Reservations';
import NotFound from './components/NotFound';
import PageLayout from './layouts/PageLayout';

function App() {
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { businessid } = useParams();

  const fetchBusiness = async () => {
    try {
      await axios.get(`/businesses/${businessid}`).then(res => {
        setBusiness(res.data.data.business);
        setServices(res.data.data.business.services);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchServices = async () => {
  //   try {
  //     await axios.get(`/services`).then(res => {
  //       setServices(res.data.data.data);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    Promise.all([fetchBusiness()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="App">
          <div className="page-layout page-layout--flex">
            <Routes>
              <Route element={<PageLayout business={business} />}>
                <Route
                  path="/"
                  element={<Home business={business} services={services} />}
                />
                <Route
                  path={`/service`}
                  element={<Service id={business._id} services={services} />}
                />
                <Route path="/date" element={<DateCompo id={business._id} />} />
                <Route
                  path="/contact"
                  element={<Contact id={business._id} />}
                />
                <Route
                  path="/reservation/:id"
                  element={<Reservation id={business._id} />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
