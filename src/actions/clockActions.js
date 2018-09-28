import { START_STOP_TIMER } from './types';

export const startStopTimer = (time) => dispatch => {
    dispatch({
        type: START_STOP_TIMER,
        payload: time
    });
}