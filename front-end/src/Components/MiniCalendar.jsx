import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MiniCalendar.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const now = new Date();
const currentDay = now.getDate();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); //gets the day of the week of the first day of the month
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //gets the date for the last day of the month by going to the next month, and then going back one day (as the 0th day of a month is the day before)

const MiniCalendar = () => {
    const dayTiles = [];
    const navigate = useNavigate();
    for (let i = 0; i < firstDayOfMonth; i++){
        const currTile = <div key={`empty-${i}`} className="dayTile empty"></div>;
        dayTiles.push(currTile);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        let tileClass = 'future';
        if (day < currentDay) {
            tileClass = 'past';
        } else if (day === currentDay) {
            tileClass = 'current';
        }
        const currTile = <div key={day} className={`dayTile ${tileClass}`}>{day}</div>;
    
        dayTiles.push(currTile);
    }
    
    return(
        <div className="miniCalendar" onClick={() => navigate('/calendar')}>
            <div className="weekDays">
                {days.map(day => (
                    <div key={day} className="weekDay">{day}</div>
                ))}
            </div>
            <div className="daysGrid">
                {dayTiles}
            </div>
        </div>
    );
};

export default MiniCalendar;