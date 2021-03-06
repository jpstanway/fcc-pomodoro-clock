import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import { setTimer, startStopTimer, reset, adjustLength, setProgressBar } from '../actions/clockActions';

let countdown, currentTime, newTime, nextTime, audio;

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            inProgress: false,
            isBreak: false
        }
        this.timer = this.timer.bind(this);
        this.handleTimer = this.handleTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.handleLength = this.handleLength.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
    }

    componentDidMount() {
        // set audio element
        audio = document.getElementById('beep');
    }

    timer() {
        // get the currently set session time
        currentTime = this.props.timer.split(":");
        
        // set a new Date object
        newTime = new Date();
        newTime.setMinutes(currentTime[0], currentTime[1]);

        // create another Date object with subtracted value
        nextTime = new Date(newTime.valueOf() - 1000);
        nextTime = nextTime.toTimeString().split(' ');
        nextTime = nextTime[0].split(':');
        nextTime = `${nextTime[1]}:${nextTime[2]}`;

        // set next value to timer element
        this.props.startStopTimer(nextTime);

        // if value hits '0' stop interval...
        if (nextTime === '00:00') {
            //stop current audio from playing
            this.stopAudio();
            // play audio element
            audio.play();
        } else if (nextTime === '59:59') {
            // is it currently a break?
            const breakTime = !this.state.isBreak ? true : false;
            // reset local state
            this.setState({
                inProgress: false,
                isBreak: breakTime
            });
            // start timer again
            this.pauseTimer();
            this.handleTimer();
        }
    }

    handleTimer() {
        const { isRunning, inProgress, isBreak } = this.state;

        // is a countdown in progress?
        if(inProgress) {
            // YES...is the timer currently running?
            if(isRunning) {
                // YES... pause it
                this.pauseTimer();
            } else {
                // NO... resume timer
                this.startTimer();
            }
        } else {
            // NO...ok, let's start a fresh countdown... is it break time?
            this.setState({ inProgress: true });
            if(isBreak) {
                // YES... start timer from break
                this.props.setTimer('break');
            } else {
                // NO... start timer from session
                this.props.setTimer('session');
            }
            // set the progress bar value
            this.props.setProgressBar();
            // begin timer function
            this.startTimer();
        }
    }

    startTimer() {
        this.setState({ isRunning: true });
        countdown = setInterval(this.timer, 1000);
    }

    pauseTimer() {
        clearInterval(countdown);
        this.setState({ isRunning: false });
    }

    resetTimer() {
        // stop current countdown...
        this.pauseTimer();
        // stop audio element
        this.stopAudio();
        // reset local state values
        this.setState({
            inProgress: false,
            isBreak: false
        });
        // and reset default values
        this.props.reset();    
    }

    handleLength(e) {
        // get button value; either '+' or '-'
        const button = e.target.value;
        const target = e.target.className.split(" ");
        const currentValue = target[0] === 'session' ? this.props.session : this.props.break;
        let newValue;
        // set value limits and adjust newvalue
        if(button === '+' && currentValue < 60) {
            newValue = currentValue + 1;
        } else if(button === '-' && currentValue > 1) {
            newValue = currentValue - 1;
        } else {
            return false;
        }
        this.props.adjustLength(target[0], newValue);
    }

    stopAudio() {
        audio.pause();
        audio.currentTime = 0;
    }

    render() {
        return(
            <Row id="controls">
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="session-label" className="text-element">Session Length</h3>
                        <p id="session-length" className="number-element">{this.props.session}</p>
                        <ButtonGroup>
                            <Button id="session-decrement" className="session" onClick={this.handleLength} value="-"><i className="far fa-minus-square btn-icon"></i></Button>
                            <Button id="session-increment" className="session" onClick={this.handleLength} value="+"><i className="far fa-plus-square btn-icon"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <ButtonGroup id="main-controls">
                            <Button id="start_stop" onClick={this.handleTimer}><i className="far fa-play-circle btn-icon"></i><i className="far fa-pause-circle"></i></Button>
                            <Button id="reset" onClick={this.resetTimer}><i className="fas fa-redo-alt btn-icon"></i></Button>
                        </ButtonGroup>
                        <audio id="beep" src="https://res.cloudinary.com/mtninja/video/upload/v1538415257/Electronic_Chime-KevanGC-495939803_hhiu2y.wav"></audio>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="break-label" className="text-element">Break Length</h3>
                        <p id="break-length" className="number-element">{this.props.break}</p>
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
    adjustLength: PropTypes.func.isRequired,
    setProgressBar: PropTypes.func.isRequired
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
    adjustLength,
    setProgressBar
})(Controls);