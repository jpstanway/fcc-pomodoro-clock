import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Clock extends Component {
    render() {
        return(
            <div id="timer">
                <h1 id="timer-label" className="text-element">{this.props.label}</h1>
                <h2 id="time-left" className="number-element">{this.props.timer}</h2>
            </div>
        );
    }
}

Clock.propTypes = {
    label: PropTypes.string.isRequired,
    timer: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    label: state.clock.label,
    timer: state.clock.timer
});

export default connect(mapStateToProps, {})(Clock);