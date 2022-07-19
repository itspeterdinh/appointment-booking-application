import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../Contexts/app-context';

function ToolBar() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const updateLocalStorage = () => {
    const reservedSession = JSON.parse(
      localStorage.getItem('blinkk-esthetics-appointment')
    );
    reservedSession.services = ctx.selectedServices;
    localStorage.setItem(
      'blinkk-esthetics-appointment',
      JSON.stringify(reservedSession)
    );
  };

  const navigateHandler = () => {
    navigate('/date');
    updateLocalStorage();
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <nav className="widget-toolbar-container">
      <div className="widget-toolbar-container__actions">
        {location.pathname === '/service' && (
          <button
            type="button"
            className="w-button w-button--small w-button--primary w-button--rounded 
          widget-toolbar-container__button widget-toolbar-container__button--continue 
          ember-view button button--is-disable"
            disabled={!ctx.state}
            onClick={navigateHandler}
          >
            Continue
          </button>
        )}
        {(location.pathname === '/date' ||
          location.pathname === '/contact') && (
          <button
            type="button"
            className="w-button w-button--small w-button--secondary w-button--rounded 
          widget-toolbar-container__button widget-toolbar-container__button--previous 
          ember-view button"
            onClick={navigateBack}
          >
            Back
          </button>
        )}
      </div>
    </nav>
  );
}

export default ToolBar;
