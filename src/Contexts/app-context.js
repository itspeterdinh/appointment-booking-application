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
