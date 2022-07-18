import React from 'react';

import ApmtSteps from './ApmtSteps';

function Date() {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps step="date" />
        </aside>
      </section>
    </section>
  );
}

export default Date;
