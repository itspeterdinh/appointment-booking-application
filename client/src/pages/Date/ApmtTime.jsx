/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useContext } from 'react';
import AppContext from '../../contexts/app-context';
import { format, startOfToday, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';

function ApmtTime({
  id,
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
  const newSchedule = splitSchedule(dateData.schedule, ctx);
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
          } else {
            setSelectedDay(undefined);
            setDateData(undefined);
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

  const releaseHold = async _id => {
    try {
      await axios.patch(`/date/release-hold/${_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAvaibility = async _id => {
    try {
      let skip = false;
      if (
        ctx.selectedTime.slot &&
        Date.now() - ctx.selectedTime.lastAdd + 1000 < 10 * 60 * 1000 &&
        _id === ctx.selectedTime.slot._id
      )
        skip = true;
      await axios
        .patch(`/date/check-availability/${_id}`, {
          skip: skip
        })
        .then(res => {
          if (res.data.data.isAvailable) {
            if (ctx.selectedTime.slot && !skip) {
              releaseHold(ctx.selectedTime.slot._id);
            }
            ctx.setRedirect(false);
            ctx.setSelectedTime({
              date: date.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              time: convertToTime(res.data.data.slot.time, true),
              slot: res.data.data.slot,
              lastAdd: Date.now()
            });
            updateTime({
              date: date.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              time: convertToTime(res.data.data.slot.time, true),
              slot: res.data.data.slot,
              lastAdd: Date.now()
            });
            navigate(`/book/${id}/contact`);
          } else {
            if (ctx.selectedTime.dateData) {
              ctx.setSelectedTime({});
            }
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

  const updateTime = selectedTime => {
    const reservedSession = JSON.parse(
      localStorage.getItem('blinkk-esthetics-appointment')
    );
    reservedSession.time = selectedTime;
    reservedSession.lastUpdatedTime = Date.now();
    localStorage.setItem(
      'blinkk-esthetics-appointment',
      JSON.stringify(reservedSession)
    );
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
              <h5 className="appointment-time-category-title font--bold m-top--16 m-bottom--8">
                Morning
              </h5>
              {timeSlotContainer(newSchedule.morning, ctx, handleOnClick)}
            </div>
            <div className="ember-view grid-col grid-col-1-3-m grid-col-1-1-xs">
              <h5 className="appointment-time-category-title font--bold m-top--16 m-bottom--8">
                Afternoon
              </h5>
              {timeSlotContainer(newSchedule.afternoon, ctx, handleOnClick)}
            </div>
            <div className="ember-view grid-col grid-col-1-3-m grid-col-1-1-xs">
              <h5 className="appointment-time-category-title font--bold m-top--16 m-bottom--8">
                Evening
              </h5>
              {timeSlotContainer(newSchedule.evening, ctx, handleOnClick)}
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

const convertToTime = (time, full) => {
  let tail = 'AM';
  if (time >= 12) {
    tail = 'PM';
    if (time > 12) time -= 12;
  }
  if (full) {
    return (
      time.toString() + ':00 ' + tail + ' - ' + time.toString() + ':50 ' + tail
    );
  }
  return time.toString() + ':00 ' + tail.toLowerCase();
};

const splitSchedule = (schedule, ctx) => {
  const newSchedule = {
    morning: [],
    afternoon: [],
    evening: []
  };

  schedule
    ?.filter(el => validate(el, ctx))
    .forEach(el => {
      if (el.time < 12) {
        newSchedule.morning = [...newSchedule.morning, el];
      } else if (el.time < 18) {
        newSchedule.afternoon = [...newSchedule.afternoon, el];
      } else {
        newSchedule.evening = [...newSchedule.evening, el];
      }
    });

  return newSchedule;
};

const validate = (el, ctx) => {
  if (
    !el.isBooked &&
    (Date.now() - new Date(el.lastHold).getTime() > 10 * 60 * 1000 ||
      (ctx.selectedTime.slot &&
        Date.now() - ctx.selectedTime.lastAdd + 1000 < 10 * 60 * 1000 &&
        el._id === ctx.selectedTime.slot._id))
  )
    return true;
  return false;
};

const timeSlotContainer = (timeSlotList, ctx, handleOnClick) => {
  return (
    <div className="appointment-time-items w-background-light">
      {timeSlotList.length > 0 ? (
        timeSlotList.map(el => {
          return (
            <Button
              key={el._id}
              type="button"
              className={
                'time-item w-button w-button--small w-button--primary w-button--rounded ' +
                (ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id
                  ? 'w-button--secondary'
                  : 'button--primary')
              }
              onClick={() => handleOnClick(el._id)}
            >
              {(ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id
                ? '✔ '
                : '') + convertToTime(el.time, false)}
            </Button>
          );
        })
      ) : (
        <Button
          className="w-button w-button--small w-button--primary w-button--rounded all-booked-button"
          type="button"
          disabled
        >
          All booked
        </Button>
      )}
    </div>
  );
};

export default ApmtTime;
