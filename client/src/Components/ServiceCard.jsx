import React, { useState, useContext, useEffect } from 'react';
import { services } from './TestData';
import AppContext from '../Contexts/app-context';

function ServiceCard(props) {
  const ctx = useContext(AppContext);
  const [checked, setChecked] = useState(ctx.element.has(props.id));
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    setChecked(ctx.element.has(props.id));
  }, [ctx.element, props.id]);

  const handleChange = () => {
    setChecked((prev) => !prev);
    handleSelected(props.index);
  };

  const showInfo = () => {
    setShowed((prev) => !prev);
  };

  const handleSelected = (index) => {
    if (ctx.element.has(props.id)) {
      ctx.setSelectedServices('remove', services[index]);
    } else {
      ctx.setSelectedServices('add', services[index]);
    }
  };

  return (
    <div
      className={
        'ember-view card card--interactive' + (checked ? ' card--active' : '')
      }
      onClick={handleChange}
      key={props.id}
    >
      <div className="row">
        <div className="col col-10 col-md-11">
          <h5 className="service-card__header font--bold m-bottom--8">
            {props.name}
          </h5>
          <div
            className="service-card__footer"
            onClick={(e) => e.stopPropagation()}
          >
            {!props.price ? 'Price Varies · ' : '$' + props.price + ' · '}
            {props.time + ' minutes · '}
            <button
              className="service-card__button"
              type="button"
              onClick={showInfo}
            >
              <strong>More info</strong>
            </button>
            {showed && (
              <div>
                <p className="description m-top--8 font--small">
                  {props.description}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col col-2 col-md-1">
          <div className="checkbox-group">
            <div className="form-checkbox__container">
              <input
                type="checkbox"
                className="form-checkbox__input"
                checked={checked}
                onChange={() => handleChange}
              />
              <div className="form-checkbox__control"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
