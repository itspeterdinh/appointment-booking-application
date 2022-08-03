import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Contexts/app-context';
import ApmtSteps from './ApmtSteps';
import ReservationForm from './ReservationForm';

function Contact() {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);

  useEffect(() => {
    if (!ctx.selectedTime.dateData || ctx.redirect) {
      navigate('/date');
    }
  }, [ctx.selectedTime.dateData, navigate, ctx.redirect]);

  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps step="contact" />
        </aside>
        <ReservationForm />
      </section>
    </section>
  );
}

export default Contact;
