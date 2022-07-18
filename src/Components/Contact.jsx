import React from 'react';

import ApmtSteps from './ApmtSteps';

function Contact() {
  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps step="contact" />
        </aside>
      </section>
    </section>
  );
}

export default Contact;
