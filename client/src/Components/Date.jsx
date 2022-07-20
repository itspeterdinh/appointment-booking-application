import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApmtSteps from './ApmtSteps';
import Calendar from './Calendar';
import AppContext from '../Contexts/app-context';

function Date() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctx.state) {
      navigate('/service');
    }
  }, [ctx, navigate]);

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
