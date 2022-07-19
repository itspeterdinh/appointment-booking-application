import React, { useEffect, useState } from 'react';

const AppContext = React.createContext({
  state: false,
  element: Set,
  selectedServices: [],
  setSelectedServices: () => {},
});

export const AppContextProvider = (props) => {
  const [state, setState] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [element, setElement] = useState(new Set());

  const handleSelectedServices = (action, item) => {
    if (action === 'add') {
      setSelectedServices((prev) => [...prev, item]);
      addElement(item.id);
    } else {
      setSelectedServices(selectedServices.filter((el) => el.id !== item.id));
      removeElement(item.id);
    }
  };

  const addElement = (element) => {
    setElement((prev) => new Set(prev.add(element)));
  };

  const removeElement = (element) => {
    setElement((prev) => new Set([...prev].filter((x) => x !== element)));
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
      for (let i = 0; i < reservedSession.services.length; i++) {
        addElement(reservedSession.services[i].id);
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
