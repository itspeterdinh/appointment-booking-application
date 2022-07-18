import React from 'react';
import { services } from './TestData';

function ApmtSteps(props) {
  return (
    <ul className="appointment-steps">
      <li
        className={
          'ember-view sidebar-section m-bottom--16 side-bar-section--service ' +
          (props.step === 'service' && 'active')
        }
      >
        <div className="font--bold m-bottom--16 link--browser">
          <h5 className="sidebar-section-title">Select service</h5>
        </div>
        <div className="sidebar-multi-service-selection"></div>
      </li>
      <li
        className={
          'ember-view sidebar-section m-bottom--16 side-bar-section--date ' +
          (props.step === 'date' && 'active')
        }
      >
        <div className="font--bold m-bottom--16 link--browser">
          <h5 className="sidebar-section-title">Select date and time</h5>
        </div>
      </li>
      <li
        className={
          'ember-view sidebar-section m-bottom--16 ' +
          (props.step === 'contact' && 'active')
        }
      >
        <div className="font--bold m-bottom--16 link--browser">
          <h5 className="sidebar-section-title">Enter your information</h5>
        </div>
      </li>
    </ul>
  );
}

export default ApmtSteps;
