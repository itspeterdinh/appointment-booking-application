/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

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
          <li className="font--bold">
            <a
              className={'tab ' + (el.isActive && 'tab--active')}
              onClick={() => handleItems(el.id)}
            >
              {el.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

const services = [
  {
    name: 'Haircut + Design',
    description: 'regular hair cut and design of choice',
    time: 45,
  },
  {
    name: 'Haircut + Beard',
    description: 'regular hair cut and beard taper and lineup',
    price: 30,
    time: 45,
  },
  {
    name: 'Regular Haircut',
    description: 'Includes fade/taper, trim on top, and lineup',
    price: 25,
    time: 45,
  },
];

const staffs = ['Rosie Uyen Kieu'];

export default Main;
