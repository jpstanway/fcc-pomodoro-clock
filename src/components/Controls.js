import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import { setTimer, startStopTimer, reset, adjustLength } from '../actions/clockActions';

let countdown;

class Controls extends Component {
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.handleLength = this.handleLength.bind(this);
    }

    timer(startTime) {
        // get the currently set session time
        let currentTime = this.props.timer.split(":");

        // set a new Date object
        let newTime = new Date();
        newTime.setMinutes(currentTime[0], currentTime[1]);

        // create another Date object with subtracted value
        let nextTime = new Date(newTime.valueOf() - 1000);
        nextTime = nextTime.toTimeString().split(' ');
        nextTime = nextTime[0].split(':');
        nextTime = `${nextTime[1]}:${nextTime[2]}`;

        // if value hits '0' stop interval...
        if (nextTime === '00:00') {
            this.pauseTimer();
        }
        
        this.props.startStopTimer(nextTime);
    }

    startTimer() {
        this.props.setTimer();

        countdown = setInterval(this.timer, 1000);
    }

    pauseTimer() {
        clearInterval(countdown);
    }

    resetTimer() {
        this.pauseTimer();
        this.props.reset();    
    }

    handleLength(e) {
        const button = e.target.value;
        const target = e.target.className.split(" ");
        const currentValue = target[0] === 'session' ? this.props.session : this.props.break;
        let newValue;

        if(button === '+' && currentValue < 60) {
            newValue = currentValue + 1;
        } else if(button === '-' && currentValue > 1) {
            newValue = currentValue - 1;
        } else {
            return false;
        }

        this.props.adjustLength(target[0], newValue);
    }

    render() {
        return(
            <Row id="controls">
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="session-label">Session Length</h3>
                        <p id="session-length">{this.props.session}</p>
                        <ButtonGroup>
                            <Button id="session-decrement" className="session" onClick={this.handleLength} value="-"><i className="far fa-minus-square btn-icon"></i></Button>
                            <Button id="session-increment" className="session" onClick={this.handleLength} value="+"><i className="far fa-plus-square btn-icon"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <ButtonGroup>
                            <Button id="start-stop" onClick={this.startTimer}><i className="far fa-play-circle btn-icon"></i><i className="far fa-pause-circle"></i></Button>
                            <Button id="reset" onClick={this.resetTimer}><i className="fas fa-redo-alt btn-icon"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="break-label">Break Length</h3>
                        <p id="break-length">{this.props.break}</p>
                        <ButtonGroup>
                            <Button id="break-decrement" className="break" onClick={this.handleLength} value="-"><i className="far fa-minus-square btn-icon"></i></Button>
                            <Button id="break-increment" className="break" onClick={this.handleLength} value="+"><i className="far fa-plus-square btn-icon"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>      
            </Row>
        );
    }
}

Controls.propTypes = {
    timer: PropTypes.string.isRequired,
    session: PropTypes.number.isRequired,
    break: PropTypes.number.isRequired,
    setTimer: PropTypes.func.isRequired,
    startStopTimer: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    adjustLength: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    timer: state.clock.timer,
    session: state.clock.session,
    break: state.clock.break
});

export default connect(mapStateToProps, { 
    setTimer,
    startStopTimer, 
    reset, 
    adjustLength
})(Controls);