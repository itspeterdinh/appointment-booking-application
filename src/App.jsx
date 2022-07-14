import React from 'react';

//import Calendar from './Components/Calendar';
import './Styles/globals.css';
import Header from './Components/Header';
import Section from './Components/Section';

function App() {
  return (
    <React.Fragment>
      <div className="landing-widget">
        <Header />
        <Section />
        {/* <Calendar /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
