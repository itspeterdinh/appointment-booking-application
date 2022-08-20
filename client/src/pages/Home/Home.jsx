import React from 'react';
import Intro from './Intro';
import LocationMap from './LocationMap';
import Connect from './Connect';
import Main from './Main';

function Section({ business, services }) {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-12 col-md-4 m-bottom--96--sm m-bottom--32 w-background-light sidebar">
          <Intro
            id={business._id}
            name={business.name}
            avatar={business.avatar}
            description={business.description}
          />
          <LocationMap hours={business.hours} />
          <Connect
            email={business.email}
            phone={business.phone}
            instagram={business.instagram}
          />
        </aside>
        <div className="col m-bottom-96">
          <Main business={business} services={services} />
        </div>
      </section>
    </section>
  );
}

export default Section;
