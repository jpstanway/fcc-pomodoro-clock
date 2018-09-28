import { START_STOP_TIMER } from './types';

export const startStopTimer = () => dispatch => {
    console.log('dispatching...');
    dispatch({
        type: START_STOP_TIMER
    });
}