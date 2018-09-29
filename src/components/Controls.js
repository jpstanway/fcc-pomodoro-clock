import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import { startStopTimer, reset } from '../actions/clockActions';

let countdown;

class Controls extends Component {
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    timer() {
        // get the current time
        let currentTime = this.props.timer.split(':');

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
        countdown = setInterval(this.timer, 1000);
    }

    pauseTimer() {
        clearInterval(countdown);
    }

    resetTimer() {
        this.pauseTimer();
        this.props.reset();    
    }

    render() {
        return(
            <Row id="controls">
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="session-label">Session Length</h3>
                        <p id="session-length">{this.props.session}</p>
                        <ButtonGroup>
                            <Button id="session-decrement"><i className="far fa-minus-square"></i></Button>
                            <Button id="session-increment"><i className="far fa-plus-square"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <ButtonGroup>
                            <Button id="start-stop" onClick={this.startTimer}><i className="far fa-play-circle"></i><i className="far fa-pause-circle"></i></Button>
                            <Button id="reset" onClick={this.resetTimer}><i className="fas fa-redo-alt"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="break-label">Break Length</h3>
                        <p id="break-length">{this.props.break}</p>
                        <ButtonGroup>
                            <Button id="break-decrement"><i className="far fa-minus-square"></i></Button>
                            <Button id="break-increment"><i className="far fa-plus-square"></i></Button>
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
    startStopTimer: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    timer: state.clock.timer,
    session: state.clock.session,
    break: state.clock.break
});

export default connect(mapStateToProps, { startStopTimer, reset })(Controls);