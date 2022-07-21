import React from 'react';
import Intro from './Intro';
import LocationMap from './LocationMap';
import Connect from './Connect';
import Main from './Main';

function Section({ business, isLoading }) {
  return (
    <section className="container landing">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="row">
          <aside className="col col-12 col-md-4 m-bottom--96--sm m-bottom--32 w-background-light sidebar">
            <Intro name={business.name} avatar={business.avatar} />
            <LocationMap hours={business.hours} />
            <Connect />
          </aside>
          <div className="col m-bottom-96">
            <Main />
          </div>
        </section>
      )}
    </section>
  );
}

export default Section;
