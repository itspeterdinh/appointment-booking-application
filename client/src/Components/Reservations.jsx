/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Reservation() {
  const [reservation, setReservation] = useState({});
  const [isCancelled, setIsCancelled] = useState(false);
  const { id } = useParams();

  const fetchReservation = async () => {
    try {
      await axios.get(`/reservation/${id}`).then(res => {
        setReservation(res.data.data.data);
        setIsCancelled(res.data.data.data.isCancelled);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAppointmentHandler = async () => {
    try {
      await axios
        .post(`/reservation/cancel-appointment/${id}`, {
          slot: reservation.slot
        })
        .then(res => {
          setReservation(res.data.data.data);
          setIsCancelled(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  useEffect(() => {}, [reservation]);

  return (
    <div className="widget">
      <div className="widget-section">
        <div className="appointment">
          {reservation.date &&
            appointmentSection(
              isCancelled,
              reservation,
              cancelAppointmentHandler
            )}
        </div>
      </div>
    </div>
  );
}

const appointmentSection = (
  isCancelled,
  reservation,
  cancelAppointmentHandler
) => {
  return (
    <section className="container">
      <section className="row">
        <div className="col col-sm-8 col-md-6 offset-sm-2 offset-md-3 w-background-light reservations-show">
          {!isCancelled ? (
            <div className="reservations-show__message reservations-show__header-section m-bottom--32">
              <h3 className="reservations-show__title__text font--bold m-bottom--8">
                Appointment accepted!
              </h3>
              <div className="reservations-show__header-message m-bottom--24">
                <p>We're looking forward to seeing you.</p>
              </div>
            </div>
          ) : (
            <div className="reservations-show__message reservations-show__header-section m-bottom--32">
              <h3 className="reservations-show__title__text font--bold m-bottom--8">
                Appointment cancelled
              </h3>
              <div className="reservations-show__header-message m-bottom--24">
                <p>
                  This appointment has been cancelled. Please book a new
                  appointment.
                </p>
              </div>
              <div className="reservations-show__header-buttons">
                <button
                  className="w-button w-button--primary w-button--rounded w-button--small col-sm-7"
                  type="button"
                >
                  Book another appointment
                </button>
              </div>
            </div>
          )}
          {!isCancelled && (
            <div className="reservations-show__body card card--border-top-bottom m-bottom--24">
              <div className="reservations-show__body__details">
                <div className="reservations-show__staff m-bottom--32">
                  <div className="item-image-holder reservations-show__staff__image">
                    <div className="item-image item-image--null">
                      <p className="font--bold">R</p>
                    </div>
                  </div>
                  <div className="reservations-show__staff__info">
                    <h4 className="font--bold">Rosie Uyen Kieu</h4>
                  </div>
                </div>
                <h5 className="font--bold m-bottom--16">
                  <div className="ember-view">
                    {reservation.date}
                    <br />
                    {reservation.time.toLowerCase() + ' PDT'}
                  </div>
                </h5>
                <div className="m-bottom--24">
                  <p className="color--full-black">Haircur + Design</p>
                </div>
                <div className="m-bottom--32">
                  <a
                    className="reservations-show__phone m-bottom--16"
                    href="https://www.google.com/maps/place/Message+me+for+address+San+Jose+CA+95111-1229/@37.3089729,-121.9586864,15z/data=!3m1!4b1"
                  >
                    Message me for address
                    <br />
                    San Jose, CA 95117
                  </a>
                  <p>
                    <a
                      className="ember-view reservations-show__phone"
                      href="tel:+14088595184"
                    >
                      (408) 859-5184
                    </a>
                  </p>
                </div>
              </div>
              <div className="reservations-show__actions m-bottom--32 link--browser">
                <div className="m-bottom--16">
                  <button
                    className="w-button w-button--primary w-button--rounded w-button--small col-sm-8"
                    type="button"
                  >
                    Add to calendar
                  </button>
                </div>
                <div className="m-bottom--32">
                  <button
                    className="w-button w-button--secondary w-button--rounded w-button--small col-sm-8"
                    type="button"
                  >
                    Share on Twitter
                  </button>
                </div>
                <div className="link--browser m-bottom--12">
                  <a className="font--bold" href="#">
                    Reschedule appointment
                  </a>
                </div>
                <div className="link--browser m-bottom--12">
                  <button
                    className="w-button w-button--text w-button--rounded w-button--large col-sm-8"
                    type="button"
                    onClick={cancelAppointmentHandler}
                  >
                    Cancel appointment
                  </button>
                </div>
                <div className="link--browser">
                  <button
                    className="w-button w-button--text w-button--rounded w-button--large col-sm-8"
                    type="button"
                  >
                    Book another appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Reservation;
