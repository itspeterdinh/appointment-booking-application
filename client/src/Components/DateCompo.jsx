import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApmtSteps from './ApmtSteps';
import Calendar from './Calendar';
import ApmtTime from './ApmtTime';
import AppContext from '../Contexts/app-context';
import { format, parse, startOfToday } from 'date-fns';

function DateCompo() {
  const today = startOfToday();
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [dateData, setDateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(
    (ctx.selectedTime.date && new Date(ctx.selectedTime.date)) || today
  );
  const [selectedMonth, setSelectedMonth] = useState(
    format(
      (ctx.selectedTime.date && new Date(ctx.selectedTime.date)) || today,
      'MMM-yyyy'
    )
  );
  const [scheduleData, setScheduleData] = useState(
    (ctx.selectedTime.date &&
      Array(getIndex(today, selectedMonth)).fill(undefined)) ||
      []
  );
  const firstDayCurrentMonth = parse(selectedMonth, 'MMM-yyyy', new Date());

  useEffect(() => {
    if (!ctx.state) {
      navigate('/service');
    }
  }, [ctx.state, navigate]);

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
          <Calendar
            setDateData={setDateData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            firstDayCurrentMonth={firstDayCurrentMonth}
          />
          {dateData && (
            <ApmtTime
              dateData={dateData}
              setDateData={setDateData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              setScheduleData={setScheduleData}
              firstDayCurrentMonth={firstDayCurrentMonth}
            />
          )}
        </div>
      </section>
    </section>
  );
}

const getIndex = (today, cur) => {
  const multiplier =
    parse(cur, 'MMM-yyyy', new Date()).getYear() - today.getYear();
  return (
    parse(cur, 'MMM-yyyy', new Date()).getMonth() +
    12 * multiplier -
    today.getMonth()
  );
};

export default DateCompo;
