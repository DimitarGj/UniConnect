import React, { useState } from 'react';
import './css/LargeCalendar.css';
import HeaderNavBar from './HeaderNavBar.jsx';

const LargeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const changeMonth = (num) => {
    const newDate = new Date(currentYear, currentMonth + num, 1);
    setCurrentDate(newDate);
  };

  const dayTiles = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayTiles.push(<div key={`empty-${i}`} className="dayTile"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isPast = day < currentDay && currentMonth === new Date().getMonth();
    const isToday = day === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
    let tileClass = isPast ? 'past' : isToday ? 'current' : 'future';
    dayTiles.push(<div key={day} className={`dayTile ${tileClass}`}>{day}</div>);
  }

  return (
    <div className="largeCalendarPageContainer">
      <HeaderNavBar />
      <div className="monthNavigation">
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <span>{months[currentMonth]} {currentYear}</span>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div className="largeCalendarContainer">
        <div className="weekDays">
          {days.map(day => (
            <div key={day} className="weekDay">{day}</div>
          ))}
        </div>
        <div className="daysGrid">
          {dayTiles}
        </div>
      </div>
    </div>
  );
};

export default LargeCalendar;
