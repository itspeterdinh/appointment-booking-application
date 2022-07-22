/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function LocationMap(props) {
  const [toggle, setToggle] = useState(true);
  const current = new Date();

  return (
    <section className="company-location-hours m-bottom--32">
      <h5 className="font--bold m-bottom--16">Location & hour</h5>
      <div className="company-location-map m-bottom--24"></div>
      <div className="company-location-details m-bottom--8">
        <span className="data-descriptive-icon obs-icon--location-stroked" />
        <div className="company-location-address m-bottom--8">
          <p className="company-brick-and-mortar">
            Message me for address <br /> San Jose, CA 95117
          </p>
        </div>
      </div>
      <div className="company-open-hours">
        <span className="data-descriptive-icon obs-icon--time" />
        <div>
          {toggle ? (
            <p
              className={
                (isOpen(current, props.hours)[0]
                  ? 'color--green'
                  : 'color--red') + ' font--bold'
              }
            >
              {isOpen(current, props.hours)}{' '}
            </p>
          ) : (
            <dl className="open-hours-table m-bottom--16">
              {props.hours.map((el, index) => {
                return openHours(el, index, current, props.hours);
              })}
            </dl>
          )}
          <a
            className="font--bold blue cursor hover:underline"
            onClick={() => setToggle(prev => !prev)}
          >
            {toggle ? 'More' : 'Less'}
          </a>
        </div>
      </div>
    </section>
  );
}

const isOpen = (current, hours) => {
  const date = hours[current.getDay()];

  if (date.time === 'Closed') {
    return [false, 'Closed Today'];
  }

  const cur = date.time.split('-');

  const open = new Date();
  const close = new Date();

  open.setHours(parseInt(cur[0].split(':')[0]), 0, 0);
  close.setHours(parseInt(cur[1].split(':')[0]) + 12, 0, 0);

  if (
    open.getTime() <= current.getTime() &&
    current.getTime() <= close.getTime()
  ) {
    return [true, 'Open today until ' + cur[1] + ' PM'];
  } else {
    return [false, 'Close now'];
  }
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const openHours = (el, index, current, hours) => {
  return (
    <div className="m-bottom--8" key={index}>
      <dt
        className={classNames(
          index === current.getDay() &&
            isOpen(current, hours)[0] &&
            'color--green',
          index === current.getDay() &&
            !isOpen(current, hours)[0] &&
            'color--red',
          'font--bold'
        )}
      >
        {el.date.substring(0, 3)}
      </dt>
      <dd
        className={classNames(
          index === current.getDay() &&
            isOpen(current, hours)[0] &&
            'color--green',
          index === current.getDay() &&
            !isOpen(current, hours)[0] &&
            'color--red',
          'font--bold'
        )}
      >
        {el.time === 'Closed'
          ? el.time
          : el.time.split('-')[0] + ' AM - ' + el.time.split('-')[1] + ' PM'}
      </dd>
    </div>
  );
};

export default LocationMap;
