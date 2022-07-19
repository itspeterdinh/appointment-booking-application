import React, { useEffect, useState } from 'react';

const AppContext = React.createContext({
  state: false,
  selectedServices: [],
  setSelectedServices: () => {},
});

export const AppContextProvider = (props) => {
  const [state, setState] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectedServices = (action, item) => {
    if (action === 'add') {
      setSelectedServices((prev) => [...prev, item]);
    } else {
      setSelectedServices(selectedServices.filter((el) => el.id !== item.id));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('blinkk-esthetics-appointment')) {
      const date = new Date();
      const reservedSession = {
        lastUpdatedTime: date.getTime(),
        location: 'premises',
        services: [],
        staffs: {},
      };
      localStorage.setItem(
        'blinkk-esthetics-appointment',
        JSON.stringify(reservedSession)
      );
    } else {
      const reservedSession = JSON.parse(
        localStorage.getItem('blinkk-esthetics-appointment')
      );
      setSelectedServices(reservedSession.services);
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
        state: state,
        selectedServices: selectedServices,
        setSelectedServices: handleSelectedServices,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
