import { START_STOP_TIMER, RESET } from './types';

export const startStopTimer = (time) => dispatch => {
    dispatch({
        type: START_STOP_TIMER,
        payload: time
    });
};

export const reset = () => dispatch => {
    dispatch({
        type: RESET
    });
};