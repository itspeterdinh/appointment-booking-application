import React, { useContext } from 'react';
import AppContext from '../Contexts/app-context';
import { Link } from 'react-router-dom';

function ApmtSteps(props) {
  const ctx = useContext(AppContext);

  return (
    <ul className="appointment-steps">
      <li
        className={
          'ember-view sidebar-section m-bottom--16 side-bar-section--service ' +
          (props.step === 'service' && 'active')
        }
      >
        <div className="font--bold m-bottom--16 link--browser">
          {ctx.selectedServices.length > 0 ? (
            <>
              <h5 className="sidebar-section-title sidebar-section-title--complete">
                Services
              </h5>
              {props.step !== 'service' && ' · '}
              {props.step !== 'service' && (
                <span
                  className="sidebar-multi-service-selection--selection 
                sidebar-multi-service-selection--selection--edit"
                >
                  <Link to="/service">Edit</Link>
                </span>
              )}
            </>
          ) : (
            <h5 className="sidebar-section-title">Select service</h5>
          )}
        </div>
        <div className="sidebar-multi-service-selection">
          {ctx.selectedServices.map(data => {
            return (
              <div
                className="ember-view card card--secondary sidebar-multi-service-selection--selection"
                key={data._id}
              >
                <p>
                  <span className="color--full-black">{data.name}</span>
                  <br />
                  {data.time + ' minutes'}
                </p>
              </div>
            );
          })}
        </div>
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
