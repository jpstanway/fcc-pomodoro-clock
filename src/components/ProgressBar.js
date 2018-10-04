import React, { Component } from 'react';
import { connect } from 'react-redux';

const Filler = (props) => {
    return <div id="filler" style={{ width: `${props.percentage}%` }} />
};

class ProgressBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            percentage: 0
        }
    }

    convertTime() {
        let length = this.props.session * 60;
        let time = Number(this.props.timer.replace(':', '.')) * 60;
        console.log((length - time) / length);
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
    session: state.clock.session,
    break: state.clock.break
});

export default connect(mapStateToProps, {})(ProgressBar);