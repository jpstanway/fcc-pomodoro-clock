import React, { Component } from 'react';

class Clock extends Component {
    render() {
        return(
            <div id="timer">
                <h1 id="timer-label">Session</h1>
                <h3 id="time-left">25:00</h3>
            </div>
        );
    }
}

export default Clock;