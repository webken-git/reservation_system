import React, { Component } from 'react';
import Calendar from 'react-week-calendar';

import 'react-week-calendar/dist/style.css';

export default class WeekCalendar extends Component {
    render() {
        return (
            <Calendar scaleUnit="60"/>
        );
    }
}
