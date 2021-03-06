import { SET_TIMER, START_STOP_TIMER, RESET, ADJUST_LENGTH, SET_PROGRESS_BAR } from './types';

export const setTimer = (stage) => dispatch => {
    dispatch({
        type: SET_TIMER,
        payload: stage
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

export const setProgressBar = () => dispatch => {
    dispatch({
        type: SET_PROGRESS_BAR
    });
}