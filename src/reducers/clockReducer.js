import { SET_TIMER, START_STOP_TIMER, RESET, ADJUST_LENGTH, SET_PROGRESS_BAR } from '../actions/types';


const initialState = {
    label: 'session',
    timer: '25:00',
    session: 25,
    break: 5,
    barValue: '25:00'
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_TIMER:
            return{
                ...state,
                label: action.payload,
                timer: state[action.payload] < 10 ? `0${state[action.payload]}:00` : `${state[action.payload]}:00`
            };
        case START_STOP_TIMER:
            return{
                ...state,
                timer: action.payload
            };
        case RESET:
            return initialState;
        case ADJUST_LENGTH:
            return{
                ...state,
            [action.target]: action.val
            };    
        case SET_PROGRESS_BAR:
            return{
                ...state,
                barValue: state.timer
            };    
        default:
            return state;
    }
}