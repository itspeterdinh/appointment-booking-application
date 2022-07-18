import React from 'react';

import ApmtSteps from './ApmtSteps';
import Calendar from './Calendar';

function Date() {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps step="date" />
        </aside>
        <div className="appointment-content w-background-light-col col col-sm-10 offset-sm-1 col-md-8">
          <h3 className="font--bold m-bottom--8">
            Select your preferred date and time
          </h3>
          <Calendar />
        </div>
      </section>
    </section>
  );
}

export default Date;
