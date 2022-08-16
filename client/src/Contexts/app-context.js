/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

const AppContext = React.createContext({
  state: false,
  element: Set,
  selectedServices: [],
  setSelectedServices: () => {},
  selectedTime: {},
  setSelectedTime: () => {},
  error: false,
  setError: () => {},
  errorText: '',
  setErrorText: () => {},
  redirect: true,
  setRedirect: () => {}
});

export const AppContextProvider = props => {
  const [state, setState] = useState(false);
  const [redirect, setRedirect] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});
  const [element, setElement] = useState(new Set());

  const handleSelectedServices = (action, item) => {
    if (action === 'add') {
      setSelectedServices(prev => [...prev, item]);
      addElement(item._id);
    } else if (action === 'remove') {
      setSelectedServices(selectedServices.filter(el => el._id !== item._id));
      removeElement(item._id);
    } else {
      setSelectedServices([]);
      setElement(new Set());
    }
  };

  const addElement = element => {
    setElement(prev => new Set(prev.add(element)));
  };

  const removeElement = element => {
    setElement(prev => new Set([...prev].filter(x => x !== element)));
  };

  const setUpLocalStorage = () => {
    const newSession = {
      lastUpdatedTime: Date.now(),
      location: 'premises',
      time: {},
      services: [],
      staffs: {}
    };
    if (!localStorage.getItem('blinkk-esthetics-appointment')) {
      localStorage.setItem(
        'blinkk-esthetics-appointment',
        JSON.stringify(newSession)
      );
    } else {
      const reservedSession = JSON.parse(
        localStorage.getItem('blinkk-esthetics-appointment')
      );
      if (
        Math.floor((Date.now() - reservedSession.lastUpdatedTime) / 1000) > 900
      ) {
        localStorage.setItem(
          'blinkk-esthetics-appointment',
          JSON.stringify(newSession)
        );
      } else {
        setSelectedTime(reservedSession.time);
        setSelectedServices(reservedSession.services);
        reservedSession.services.forEach(el => {
          addElement(el._id);
        });
      }
    }
  };

  useEffect(() => {
    setUpLocalStorage();
  }, []);

  useEffect(() => {
    if (selectedServices.length > 0) {
      setState(true);
    } else {
      setState(false);
    }
  }, [selectedServices]);

  return (
    <AppContext.Provider
      value={{
        element,
        state,
        selectedServices,
        setSelectedServices: handleSelectedServices,
        selectedTime,
        setSelectedTime,
        error,
        setError,
        errorText,
        setErrorText,
        redirect,
        setRedirect
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
