import React from 'react';
import Intro from './Intro';
import LocationMap from './LocationMap';
import Connect from './Connect';
import Main from './Main';

function Section(props) {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-12 col-md-4 m-bottom--96--sm m-bottom--32 w-background-light sidebar">
          <Intro
            name={props.business.name}
            avatar={props.business.avatar}
            description={props.business.description}
          />
          <LocationMap hours={props.business.hours} />
          <Connect
            email={props.business.email}
            phone={props.business.phone}
            instagram={props.business.instagram}
          />
        </aside>
        <div className="col m-bottom-96">
          <Main services={props.services} />
        </div>
      </section>
    </section>
  );
}

export default Section;
