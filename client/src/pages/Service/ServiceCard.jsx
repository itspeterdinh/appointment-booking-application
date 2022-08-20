import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../contexts/app-context';

function ServiceCard({ index, service }) {
  const ctx = useContext(AppContext);
  const [checked, setChecked] = useState(ctx.element.has(service._id));
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    setChecked(ctx.element.has(service._id));
  }, [ctx.element, service._id]);

  const handleChange = () => {
    setChecked(prev => !prev);
    handleSelected(index);
  };

  const showInfo = () => {
    setShowed(prev => !prev);
  };

  const handleSelected = () => {
    if (ctx.element.has(service._id)) {
      ctx.setSelectedServices('remove', service);
    } else {
      ctx.setSelectedServices('add', service);
    }
  };

  return (
    <div
      className={
        'ember-view card card--interactive' + (checked ? ' card--active' : '')
      }
      onClick={handleChange}
    >
      <div className="row">
        <div className="col col-10 col-md-11">
          <h5 className="service-card__header font--bold m-bottom--8">
            {service.name}
          </h5>
          <div
            className="service-card__footer"
            onClick={e => e.stopPropagation()}
          >
            {!service.price ? 'Price Varies · ' : '$' + service.price + ' · '}
            {service.time + ' minutes · '}
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
                  {service.description}
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
