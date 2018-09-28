import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import { startStopTimer } from '../actions/clockActions';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.handleStartStop = this.handleStartStop.bind(this);
    }

    handleStartStop() {
        setInterval(this.props.startStopTimer, 1000);
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
                            <Button id="start-stop" onClick={this.handleStartStop}><i className="far fa-play-circle"></i><i className="far fa-pause-circle"></i></Button>
                            <Button id="reset"><i className="fas fa-redo-alt"></i></Button>
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
    session: PropTypes.number.isRequired,
    break: PropTypes.number.isRequired,
    startStopTimer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    session: state.clock.session,
    break: state.clock.break
});

export default connect(mapStateToProps, { startStopTimer })(Controls);