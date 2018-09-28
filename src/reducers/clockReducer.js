import { START_STOP_TIMER } from '../actions/types';


const initialState = {
    timer: '25:00',
    session: 25,
    break: 5
};

export default function(state = initialState, action) {
    switch(action.type) {
        case START_STOP_TIMER:
            return{
                ...state,
                timer: action.payload
            };
        default:
            return state;
    }
}