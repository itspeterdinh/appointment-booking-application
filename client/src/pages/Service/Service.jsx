import React from 'react';
import ApmtSteps from '../../components/ApmtSteps';
import ServiceCard from './ServiceCard';

const setUpLocalStorage = () => {
  if (!localStorage.getItem('blinkk-esthetics-appointment')) {
    localStorage.setItem(
      'blinkk-esthetics-appointment',
      JSON.stringify({
        lastUpdatedTime: Date.now(),
        location: 'premises',
        time: {},
        services: [],
        staffs: {}
      })
    );
  }
};

function Service({ id, services }) {
  setUpLocalStorage();

  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps id={id} step="service" />
        </aside>
        <div className="col col-sm-10 offset-sm-1 col-md-8 appointment-content w-background-light widget-reservation-services">
          <h3 className="font--bold m-bottom--24">
            Select one or more services
          </h3>
          {services.map((service, index) => {
            return (
              <ServiceCard
                key={'svc' + index}
                index={index}
                service={service}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Service;
