/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { services, staffs } from './TestData';

function Main() {
  const [arr, setArr] = useState([
    { id: 0, name: 'Services', isActive: true },
    { id: 1, name: 'Staff', isActive: false },
  ]);

  const handleItems = (i) => {
    setArr(
      arr.map((el) =>
        el.id === i ? { ...el, isActive: true } : { ...el, isActive: false }
      )
    );
  };

  return (
    <>
      <h4 className="font--bold m-bottom--16">Book an appointment</h4>
      <ul className="item-filter m-bottom--32">
        {arr.map((el) => (
          <li className="font--bold" key={el.name + el.id}>
            <a
              className={'tab ' + (el.isActive && 'tab--active')}
              onClick={() => handleItems(el.id)}
            >
              {el.name}
            </a>
          </li>
        ))}
      </ul>
      <section
        className={
          arr[0].isActive ? 'tab-content--active' : 'tab-content--inactive'
        }
      >
        {services.map((data) => {
          return serviceCard(data);
        })}
      </section>
      <section
        className={
          arr[1].isActive ? 'tab-content--active' : 'tab-content--inactive'
        }
      >
        {staffs.map((data) => {
          return staffCard(data);
        })}
      </section>
    </>
  );
}

const serviceCard = (data) => {
  return (
    <a
      className="card card--interactive service w-background-light"
      key={data.id}
    >
      <div className="row">
        <div className="col col-12 col-md-10">
          <h5 className="font--bold m-bottom--8">{data.name}</h5>
          <p className="m-bottom--8">{data.description}</p>
          <p className="color--full-black m-bottom--8--xs-only">
            {data.price && <span>{'$' + data.price + ' · '}</span>}
            {data.time + ' minutes'}
          </p>
        </div>
        <h5 className="col col-12 col-md-2 font--bold link--browser item__book-now">
          <span>Book now</span>
        </h5>
      </div>
    </a>
  );
};

const staffCard = (data) => {
  return (
    <a className="card card--interactive w-background-light" key={data.id}>
      <div className="row">
        <div className="col col-12 col-md-10 staff-info">
          <div className="item-image-holder m-bottom--16--xs-only">
            <div className="item-image item-image--null">
              <p className="font--bold">{data.name[0]}</p>
            </div>
          </div>
          <div>
            <h5 className="font--bold m-bottom--m">{data.name}</h5>
          </div>
        </div>
        <h5 className="col col-12 col-md-2 font--bold link--browser item__book-now">
          <span>Book now</span>
        </h5>
      </div>
    </a>
  );
};

export default Main;
