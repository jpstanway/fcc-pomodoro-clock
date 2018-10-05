import React, { Component } from 'react';
import { connect } from 'react-redux';

let barValue, currentTime, seconds, percentage;

const Filler = (props) => {
    return <div id="filler" style={{ width: `${props.percentage}%` }} />
};

class ProgressBar extends Component {
    constructor(props) {
        super(props);

        this.convertTime = this.convertTime.bind(this);
    }

    convertTime() {
        // get initial bar value and convert to seconds
        barValue = this.props.barValue.split(':');
        barValue = barValue[0] * 60;
        // get current timer value and convert to seconds
        currentTime = this.props.timer.split(":");
        seconds = (currentTime[0] * 60) + Number(currentTime[1]);
        // divide current time with initial time and multiply 
        // by 100 for accurate percentage
        percentage = (seconds / barValue) * 100;
        // set percentage value to 2 decimal places and return value
        return percentage.toFixed(2);
    }

    render() {
        return(
            <div id="progress-bar">
                <Filler percentage={this.convertTime()} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.clock.timer,
    barValue: state.clock.barValue
});

export default connect(mapStateToProps, {})(ProgressBar);