import React, { useState } from 'react';

function ServiceCard(props) {
  const [checked, setChecked] = useState(props.selected);
  const [showed, setShowed] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    props.onSelected(props.index);
  };

  const showInfo = () => {
    setShowed((prev) => !prev);
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
