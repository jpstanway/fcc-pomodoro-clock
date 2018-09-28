import { START_STOP_TIMER } from '../actions/types';


const initialState = {
    timer: '25:00',
    session: 25,
    break: 5
};

export default function(state = initialState, action) {
    function timer() {
        // get the current time
        let currentTime = state.timer.split(':');

        // set a new Date object
        let newTime = new Date();
        newTime.setMinutes(currentTime[0], currentTime[1]);

        // create another Date object with subtracted value
        let nextTime = new Date(newTime.valueOf() - 1000);
        nextTime = nextTime.toTimeString().split(' ');
        nextTime = nextTime[0].split(':');
        nextTime = `${nextTime[1]}:${nextTime[2]}`;

        // if value hits '0' stop interval...
        if (nextTime === '24:00') {
            console.log('this ran', nextTime);
            clearInterval();
        }
        
        return nextTime;
    }

    switch(action.type) {
        case START_STOP_TIMER:
            return{
                ...state,
                timer: timer()
            };
        default:
            return state;
    }
}