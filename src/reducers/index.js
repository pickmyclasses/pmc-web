import { combineReducers } from "redux";

import courses from './coursesReducer';
import authReducer from './authReducer';

// 
export default combineReducers({ courses, authReducer });