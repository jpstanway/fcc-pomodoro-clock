import { combineReducers } from 'redux';
import clockReducer from './clockReducer';

export default combineReducers({
   clock: clockReducer 
});