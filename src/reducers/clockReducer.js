import { SET_TIMER, START_STOP_TIMER, RESET, ADJUST_LENGTH } from '../actions/types';


const initialState = {
    label: 'session',
    timer: '25:00',
    session: 25,
    break: 5
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
            return{
                ...state,
                label: 'session',
                timer: '25:00',
                session: 25,
                break: 5
            };    
        case ADJUST_LENGTH:
            return{
                ...state,
            [action.target]: action.val
            };    
        default:
            return state;
    }
}