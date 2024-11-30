// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import kpiReducer from './kpiSlice'


const rootReducer = combineReducers({
  user:userReducer,
  kpi:kpiReducer
});

export default rootReducer;
