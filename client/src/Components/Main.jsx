/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react';
import { staffs } from './TestData';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Contexts/app-context';

function Main({ services }) {
  const [arr, setArr] = useState([
    { id: 0, name: 'Services', isActive: true },
    { id: 1, name: 'Staff', isActive: false }
  ]);
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  const handleItems = i => {
    setArr(
      arr.map(el =>
        el.id === i ? { ...el, isActive: true } : { ...el, isActive: false }
      )
    );
  };

  const onClick = service => {
    if (!ctx.element.has(service._id)) {
      ctx.setSelectedServices('add', service);
    }
    navigate('/service');
  };

  return (
    <>
      <h4 className="font--bold m-bottom--16">Book an appointment</h4>
      <ul className="item-filter m-bottom--32">
        {arr.map(el => (
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
        {services.map(data => {
          return serviceCard(data, onClick);
        })}
      </section>
      <section
        className={
          arr[1].isActive ? 'tab-content--active' : 'tab-content--inactive'
        }
      >
        {staffs.map(data => {
          return staffCard(data);
        })}
      </section>
    </>
  );
}

const serviceCard = (data, onClick) => {
  return (
    <a
      className="card card--interactive service w-background-light"
      key={data._id}
      onClick={() => onClick(data)}
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

const staffCard = data => {
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
