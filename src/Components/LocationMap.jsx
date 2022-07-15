/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function LocationMap() {
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
                (isOpen(current)[0] ? 'color--green' : 'color--red') +
                ' font--bold'
              }
            >
              {isOpen(current)}{' '}
            </p>
          ) : (
            <dl className="open-hours-table m-bottom--16">
              {tempDate.map((el, index) => {
                return openHours(el, index, current);
              })}
            </dl>
          )}
          <a
            className="font--bold blue cursor hover:underline"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? 'More' : 'Less'}
          </a>
        </div>
      </div>
    </section>
  );
}

const tempDate = [
  ['Sun', 'Closed'],
  ['Mon', '9:00', '5:00'],
  ['Tue', '9:00', '5:00'],
  ['Wed', '9:00', '5:00'],
  ['Thu', '9:00', '5:00'],
  ['Fri', '9:00', '5:00'],
  ['Sat', '9:00', '5:00'],
];

const isOpen = (current) => {
  const cur = tempDate[current.getDay()];

  if (cur.length === 2) {
    return [false, 'Closed Today'];
  }

  const open = new Date();
  const close = new Date();

  open.setHours(parseInt(cur[1].split()[0]), 0, 0);
  close.setHours(parseInt(cur[2].split()[0]) + 12, 0, 0);

  if (
    open.getTime() <= current.getTime() &&
    current.getTime() <= close.getTime()
  ) {
    return [true, 'Open today until ' + cur[2] + ' PM'];
  } else {
    return [false, 'Close now'];
  }
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const openHours = (el, index, current) => {
  return (
    <div className="m-bottom--8" key={index}>
      <dt
        className={classNames(
          index === current.getDay() && isOpen(current)[0] && 'color--green',
          index === current.getDay() && !isOpen(current)[0] && 'color--red',
          'font--bold'
        )}
      >
        {el[0]}
      </dt>
      <dd
        className={classNames(
          index === current.getDay() && isOpen(current)[0] && 'color--green',
          index === current.getDay() && !isOpen(current)[0] && 'color--red',
          'font--bold'
        )}
      >
        {el.length === 2 ? el[1] : el[1] + ' AM - ' + el[2] + ' PM'}
      </dd>
    </div>
  );
};

export default LocationMap;
