import React from 'react';

import Intro from './Intro';
import LocationMap from './LocationMap';

function Section() {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-12 col-md-4 m-bottom--96--sm m-bottom--32 sidebar">
          <Intro />
          <LocationMap />
        </aside>
        <main className="col m-bottom-96"></main>
      </section>
    </section>
  );
}

export default Section;
