/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useContext } from 'react';
import AppContext from '../Contexts/app-context';

function ApmtTime({ dateData, isLoading }) {
  const ctx = useContext(AppContext);
  const date = new Date();
  date.setFullYear(dateData.year, dateData.month, dateData.date);

  const cancelBooking = async data => {
    try {
      await axios
        .patch(`/date/cancel-booking/${data.dateData._id}?index=${data.index}`)
        .then(res => {
          console.log(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const checkAvaibility = async index => {
    try {
      await axios
        .patch(`/date/check-availability/${dateData._id}?index=${index}`)
        .then(res => {
          if (res.data.data.isAvailable) {
            console.log(res.data.data.isAvailable);
            if (ctx.selectedTime.dateData) {
              cancelBooking(ctx.selectedTime);
            }
            ctx.setSelectedTime({ dateData: dateData, index: index });
          } else {
            ctx.setError(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClick = index => {
    checkAvaibility(index);
  };

  return (
    <>
      {!isLoading && (
        <div className="appointment-time">
          <h4 className="appointment-time__heading font--bold m-bottom--8">
            {'Available on ' + formatDate(date.toDateString())}
          </h4>
          <p className="appointment-time__details m-bottom--32">
            <span className="appointment-time__current-section">
              Time zone:{' '}
            </span>{' '}
            <span className="appointment-time__current-section font--bold link--browser">
              <a className="text-blue-700">Pacific Time Zone (PDT)</a>
            </span>
          </p>
          <div className="grid-row appointment-time-slots">
            <div className="ember-view grid-col grid-col-1-3-m grid-col-1-1-xs">
              <div className="appointment-time-items w-background-light">
                {dateData.schedule
                  ?.map((el, index) => ({ el, index }))
                  .filter(({ el }) => !el.isBooked)
                  .map(({ el, index }) => {
                    return (
                      <button
                        key={el._id}
                        type="button"
                        className="time-item w-button w-button--small w-button--primary w-button--rounded button--primary"
                        onClick={() => handleOnClick(index)}
                      >
                        {el.time < 12 ? el.time + ':00 am' : el.time + ':00 pm'}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const formatDate = date => {
  date = date.split(' ');
  return date[0] + ', ' + date[1] + ' ' + date[2] + ', ' + date[3];
};

export default ApmtTime;
