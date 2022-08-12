/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';

function Reservation() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="widget">
      <div className="widget-section">
        <div className="appointment">
          <section className="container">
            <section className="row">
              <div className="col col-sm-8 col-md-6 offset-sm-2 offset-md-3 w-background-light reservations-show">
                <div className="reservations-show__message reservations-show__header-section m-bottom--32">
                  <h3 className="reservations-show__title__text font--bold m-bottom--8">
                    Appointment accepted!
                  </h3>
                  <div className="reservations-show__header-message m-bottom--24">
                    <p>We're looking forward to seeing you.</p>
                  </div>
                </div>
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
                        Tuesday, August 16, 2022
                        <br />
                        3:45 pm - 4:30 pm PDT
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
                        tpye="button"
                      >
                        Cancel appointment
                      </button>
                    </div>
                    <div className="link--browser">
                      <button
                        className="w-button w-button--text w-button--rounded w-button--large col-sm-8"
                        tpye="button"
                      >
                        Book another appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
