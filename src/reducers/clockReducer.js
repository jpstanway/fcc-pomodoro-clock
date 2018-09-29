import { START_STOP_TIMER, RESET, ADJUST_LENGTH } from '../actions/types';


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
        case RESET:
            return{
                ...state,
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