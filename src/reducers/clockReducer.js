import { START_STOP_TIMER } from '../actions/types';


const initialState = {
    timer: '25:00',
    session: 25,
    break: 5
};

export default function(state = initialState, action) {
    function timer(mins) {
        const time = new Date();
        time.setHours(0);
        time.setMinutes(mins);
        time.setSeconds(0);
        let timer = time.toTimeString().split(' ');
        timer = timer[0].split(':');

        return `${timer[1]}:${timer[2]}`;
    }
    
    switch(action.type) {
        case START_STOP_TIMER:
            return{
                ...state,
                timer: timer(state.session)
            };
        default:
            return state;
    }
}