/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import AppContext from '../../contexts/app-context';
import axios from 'axios';
import Button from '../../components/UI/Button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  isBefore,
  isAfter
} from 'date-fns';

function Calendar({
  setDateData,
  isLoading,
  setIsLoading,
  selectedDay,
  selectedMonth,
  scheduleData,
  setSelectedDay,
  setSelectedMonth,
  setScheduleData,
  firstDayCurrentMonth
}) {
  const today = startOfToday();
  const ctx = useContext(AppContext);
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth)
  });

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
          } else {
            if (
              ctx.selectedTime.date &&
              new Date(ctx.selectedTime.date).getMonth() ===
                firstDayCurrentMonth.getMonth()
            ) {
              firstAvailableDate = new Date(ctx.selectedTime.date);
            }
          }
          if (getIndex(today, selectedMonth) >= scheduleData.length) {
            setScheduleData(prev => [
              ...prev,
              {
                dateByMonth: res.data.data.data,
                firstAvailableDate: firstAvailableDate
              }
            ]);
          } else {
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
          }

          if (res.data.data.firstAvaiDate) {
            if (
              ctx.selectedTime.date &&
              new Date(ctx.selectedTime.date).getMonth() ===
                res.data.data.firstAvaiDate.month &&
              new Date(ctx.selectedTime.date).getDate() !==
                res.data.data.firstAvaiDate.date
            ) {
              setDateData(res.data.data.data[selectedDay.getDate() - 1]);
            } else {
              setSelectedDay(firstAvailableDate);
              setDateData(res.data.data.data[firstAvailableDate.getDate() - 1]);
            }
            setIsLoading(false);
          } else {
            if (
              ctx.selectedTime.date &&
              new Date(ctx.selectedTime.date).getMonth() ===
                firstDayCurrentMonth.getMonth()
            ) {
              setSelectedDay(new Date(ctx.selectedTime.date));
              setDateData(
                res.data.data.data[
                  new Date(ctx.selectedTime.date).getDate() - 1
                ]
              );
              setIsLoading(false);
            } else {
              setSelectedDay(undefined);
              const firstDayNextMonth = add(firstDayCurrentMonth, {
                months: 1
              });
              setSelectedMonth(format(firstDayNextMonth, 'MMM-yyyy'));
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      getIndex(today, selectedMonth) >= scheduleData.length ||
      scheduleData[getIndex(today, selectedMonth)] === undefined
    ) {
      fetchSchedule();
    } else {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    if (scheduleData[getIndex(today, selectedMonth) - 1] === undefined) {
      setIsLoading(true);
      setSelectedMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
    } else {
      if (
        scheduleData[getIndex(today, format(firstDayPreviousMonth, 'MMM-yyyy'))]
          .firstAvailableDate
      ) {
        const selectedDay =
          scheduleData[
            getIndex(today, format(firstDayPreviousMonth, 'MMM-yyyy'))
          ].firstAvailableDate;
        setDateData(
          scheduleData[
            getIndex(today, format(firstDayPreviousMonth, 'MMM-yyyy'))
          ].dateByMonth[selectedDay.getDate() - 1]
        );
      } else {
        setDateData(undefined);
      }
      setSelectedDay(
        scheduleData[getIndex(today, format(firstDayPreviousMonth, 'MMM-yyyy'))]
          .firstAvailableDate
      );
      setSelectedMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
    }
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    if (
      getIndex(today, format(firstDayNextMonth, 'MMM-yyyy')) >=
      scheduleData.length
    ) {
      setIsLoading(true);
      setSelectedMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    } else {
      const selectedDay =
        scheduleData[getIndex(today, format(firstDayNextMonth, 'MMM-yyyy'))]
          .firstAvailableDate;
      setSelectedDay(selectedDay);
      setSelectedMonth(format(firstDayNextMonth, 'MMM-yyyy'));
      setDateData(
        scheduleData[getIndex(today, format(firstDayNextMonth, 'MMM-yyyy'))]
          .dateByMonth[selectedDay.getDate() - 1]
      );
    }
  }

  function handleOnClick(day) {
    setSelectedDay(day);
    setDateData(
      scheduleData[getIndex(today, selectedMonth)].dateByMonth[
        day.getDate() - 1
      ]
    );
  }

  return (
    <div className="pt-5 m-bottom--32">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200 border">
          <div className="md:pr-0">
            <div className="flex items-center pd-1 border-bottom">
              <h2 className="flex-auto font-semibold text-gray-800">
                {!isLoading && format(firstDayCurrentMonth, 'MMM yyyy')}
              </h2>
              <Button
                type="button"
                onClick={previousMonth}
                className={
                  '-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 none-border ' +
                  (selectedMonth === format(today, 'MMM-yyyy')
                    ? 'text-gray-200'
                    : 'hover:text-gray-500')
                }
                disabled={selectedMonth === format(today, 'MMM-yyyy')}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-7 h-9" aria-hidden="true" />
              </Button>
              <Button
                onClick={nextMonth}
                type="button"
                className={
                  '-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 none-border ' +
                  (getIndex(today, selectedMonth) > 5
                    ? 'text-gray-200'
                    : 'hover:text-gray-500')
                }
                disabled={getIndex(today, selectedMonth) > 5}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-7 h-9" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid grid-cols-7 mt-5 text-xs leading-6 text-center text-gray-1300">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            {!isLoading &&
            scheduleData[getIndex(today, selectedMonth)] !== undefined ? (
              <div className="grid grid-cols-7 mt-2 mb-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5'
                    )}
                  >
                    <Button
                      type="button"
                      onClick={() => handleOnClick(day)}
                      disabled={isDisabled(
                        day,
                        today,
                        selectedMonth,
                        scheduleData,
                        ctx
                      )}
                      className={getClassName(
                        day,
                        today,
                        selectedDay,
                        scheduleData,
                        selectedMonth,
                        firstDayCurrentMonth,
                        ctx
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </Button>
                  </div>
                ))}
                <div className="py-1.5"></div>
                <div className="py-1.5"></div>
                <div className="py-1.5"></div>
                <div className="py-1.5"></div>
                <div className="py-1.5">
                  <div className="h-10 w-10"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-7 mt-2 mb-2 text-sm">
                {Array(42)
                  .fill(1)
                  .map((el, index) => (
                    <div className="py-1.5" key={index}>
                      <button className="mx-auto flex h-10 w-10 bg-gray-100 justify-center items-center rounded-full"></button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7'
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const getIndex = (today, cur) => {
  const multiplier =
    parse(cur, 'MMM-yyyy', new Date()).getYear() - today.getYear();
  return (
    parse(cur, 'MMM-yyyy', new Date()).getMonth() +
    12 * multiplier -
    today.getMonth()
  );
};

const getClassName = (
  day,
  today,
  selectedDay,
  scheduleData,
  selectedMonth,
  firstDayCurrentMonth,
  ctx
) => {
  return classNames(
    isEqual(day, selectedDay) && 'text-white',
    !isEqual(day, selectedDay) && isToday(day) && 'text-red-500',
    !isEqual(day, selectedDay) &&
      isAfter(day, today) &&
      !(
        scheduleData[getIndex(today, selectedMonth)].dateByMonth[
          day.getDate() - 1
        ].schedule.filter(
          el =>
            (ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id) ||
            (!el.isBooked &&
              Date.now() - new Date(el.lastHold).getTime() > 10 * 60 * 1000)
        ).length === 0
      ) &&
      'text-blue-700 blue-border',
    !isEqual(day, selectedDay) &&
      !isToday(day) &&
      !isSameMonth(day, firstDayCurrentMonth) &&
      'text-gray-400',
    isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
    isEqual(day, selectedDay) && !isToday(day) && 'bg-blue-500',
    !isEqual(day, selectedDay) &&
      !isToday(day) &&
      !isBefore(day, today) &&
      !(
        scheduleData[getIndex(today, selectedMonth)].dateByMonth[
          day.getDate() - 1
        ].schedule.filter(
          el =>
            (ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id) ||
            (!el.isBooked &&
              Date.now() - new Date(el.lastHold).getTime() > 10 * 60 * 1000)
        ).length === 0
      ) &&
      'hover:bg-gray-200',
    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
    (isBefore(day, today) ||
      scheduleData[getIndex(today, selectedMonth)].dateByMonth[
        day.getDate() - 1
      ].schedule.filter(
        el =>
          (ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id) ||
          (!el.isBooked &&
            Date.now() - new Date(el.lastHold).getTime() > 10 * 60 * 1000)
      ).length === 0) &&
      'text-gray-400',
    'mx-auto flex h-10 w-10 items-center justify-center rounded-full none-border font--bold'
  );
};

const isDisabled = (day, today, selectedMonth, scheduleData, ctx) => {
  return (
    isToday(day) ||
    isBefore(day, today) ||
    scheduleData[getIndex(today, selectedMonth)].dateByMonth[
      day.getDate() - 1
    ].schedule.filter(
      el =>
        (ctx.selectedTime.slot && el._id === ctx.selectedTime.slot._id) ||
        (!el.isBooked &&
          Date.now() - new Date(el.lastHold).getTime() > 10 * 60 * 1000)
    ).length === 0
  );
};

export default Calendar;
