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
  setErrorText: () => {}
});

export const AppContextProvider = props => {
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});
  const [element, setElement] = useState(new Set());

  const handleSelectedServices = (action, item) => {
    if (action === 'add') {
      setSelectedServices(prev => [...prev, item]);
      addElement(item._id);
    } else {
      setSelectedServices(selectedServices.filter(el => el._id !== item._id));
      removeElement(item._id);
    }
  };

  const addElement = element => {
    setElement(prev => new Set(prev.add(element)));
  };

  const removeElement = element => {
    setElement(prev => new Set([...prev].filter(x => x !== element)));
  };

  useEffect(() => {
    const newSession = {
      lastUpdatedTime: Date.now(),
      location: 'premises',
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
        setSelectedServices(reservedSession.services);
        reservedSession.services.forEach(el => {
          addElement(el._id);
        });
      }
    }
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
        element: element,
        state: state,
        selectedServices: selectedServices,
        setSelectedServices: handleSelectedServices,
        selectedTime: selectedTime,
        setSelectedTime: setSelectedTime,
        error: error,
        setError: setError,
        errorText: errorText,
        setErrorText: setErrorText
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
