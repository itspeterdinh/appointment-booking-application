/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';

function ReservationForm() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds
    };
  };

  const startTimer = e => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  const clearTimer = e => {
    setTimer('10:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 600);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <form className="appointment-content w-background-light input-group col col-sm-10 offset-sm-1 col-md-8 widget-reservation-contact">
      <div className="widget-contact__header-section">
        <div className="widget-contact__title m-bottom--8">
          <h3 className="font--bold m-bottom--16">
            You're nearly done. Enter your information below.
          </h3>
          <p className="widget-contact__timer m-bottom--16 weight-500">
            {timer !== '00:00'
              ? `Appointment held for ${timer}`
              : 'This appointment no longer being held'}
          </p>
        </div>
      </div>
    </form>
  );
}

export default ReservationForm;
