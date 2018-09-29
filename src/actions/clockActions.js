import { SET_TIMER, START_STOP_TIMER, RESET, ADJUST_LENGTH } from './types';

export const setTimer = () => dispatch => {
    dispatch({
        type: SET_TIMER
    });
};

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

export const adjustLength = (target, val) => dispatch => {
    dispatch({
        type: ADJUST_LENGTH,
        target: target,
        val: val
    });
};