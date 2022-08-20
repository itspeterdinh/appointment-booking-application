/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';

function Intro(props) {
  const [toggle, setToggle] = useState(true);
  const contractDescription = props.description.substring(0, 100);
  const expandedDescription = props.description.split(/\r?\n/);

  return (
    <section className="company-intro">
      <div className="item-image-holder m-bottom--16">
        <div
          className="item-image"
          style={{
            backgroundImage: `url(${props.avatar})`
          }}
        />
      </div>
      <div className="m-bottom--24">
        <h3 className="font--bold m-bottom--16 company-name">{props.name}</h3>
      </div>
      <Link to={`/${props.id}/service`}>
        <Button className="w-button w-button--large w-button--primary w-button--rounded m-bottom--24">
          Book an Appointment
        </Button>
      </Link>
      <p className="m-bottom--32">
        {toggle
          ? contractDescription
          : expandedDescription.map(el => {
              return (
                <>
                  {el}
                  <br />
                </>
              );
            })}{' '}
        <a
          className="font--bold blue cursor hover:underline"
          onClick={() => setToggle(prev => !prev)}
        >
          {toggle ? 'More' : 'Less'}
        </a>
      </p>
    </section>
  );
}

export default Intro;
