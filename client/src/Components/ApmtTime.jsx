/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useContext } from 'react';
import AppContext from '../Contexts/app-context';
import { format, startOfToday, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function ApmtTime({
  dateData,
  setDateData,
  isLoading,
  setIsLoading,
  selectedDay,
  setSelectedDay,
  setScheduleData,
  firstDayCurrentMonth
}) {
  const ctx = useContext(AppContext);
  const today = startOfToday();
  const date = new Date();
  const navigate = useNavigate();
  date.setFullYear(dateData.year, dateData.month, dateData.date);

  const fetchSchedule = async () => {
    try {
      await axios
        .get(
          `/date?year=${firstDayCurrentMonth.getFullYear()}&month=${firstDayCurrentMonth.getMonth()}&sort=date`
        )
        .then(res => {
          let firstAvailableDate = undefined;
          if (res.data.data.firstAvaiDate) {
            firstAvailableDate = new Date(
              res.data.data.firstAvaiDate.year,
              res.data.data.firstAvaiDate.month,
              res.data.data.firstAvaiDate.date
            );
            setSelectedDay(selectedDay);
            setDateData(res.data.data.data[selectedDay.getDate() - 1]);
          }
          setScheduleData(prev => {
            return prev.map((el, index) => {
              if (
                index ===
                getIndex(today, format(firstDayCurrentMonth, 'MMM-yyyy'))
              ) {
                return {
                  dateByMonth: res.data.data.data,
                  firstAvailableDate: firstAvailableDate
                };
              } else {
                return el;
              }
            });
          });
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
            if (ctx.selectedTime.dateData) {
              cancelBooking(ctx.selectedTime);
            }
            ctx.setSelectedTime({ dateData: dateData, index: index });
            navigate('/contact');
          } else {
            ctx.setErrorText(
              'We apologize, the time you selected is no longer available. Please select another time.'
            );
            ctx.setError(true);
            setIsLoading(true);
            fetchSchedule();
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
            {'Available on ' +
              date.toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
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
                  .filter(
                    ({ el }) =>
                      !el.isBooked &&
                      Date.now() - new Date(el.lastHold).getTime() >
                        10 * 60 * 1000
                  )
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

const getIndex = (today, cur) => {
  return parse(cur, 'MMM-yyyy', new Date()).getMonth() - today.getMonth();
};

export default ApmtTime;
