import React, { useState } from 'react';

const AppContext = React.createContext({
  count: 0,
  state: false,
  setState: (bool) => {},
});

export const AppContextProvider = (props) => {
  const [state, setState] = useState(false);
  const [count, setCount] = useState(0);

  const handleState = (bool, count) => {
    setState(bool);
    setCount(count);
  };

  return (
    <AppContext.Provider
      value={{ count: count, state: state, setState: handleState }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
