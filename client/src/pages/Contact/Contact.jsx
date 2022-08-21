import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/app-context';
import ApmtSteps from '../../components/ApmtSteps';
import ReservationForm from './ReservationForm';

function Contact({ id }) {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);

  useEffect(() => {
    if (!ctx.selectedTime.slot || ctx.redirect) {
      navigate(`/book/${id}/service`);
    }
  }, [id, ctx.selectedTime.slot, navigate, ctx.redirect]);

  return (
    <section className="container landing">
      <section className="row">
        <aside className="col col-md-3 m-bottom--32 w-background-light display-desktop appointment-info font--small">
          <ApmtSteps id={id} step="contact" />
        </aside>
        <ReservationForm id={id} />
      </section>
    </section>
  );
}

export default Contact;
