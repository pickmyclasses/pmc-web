import {FETCH_ALL, FETCH_BY_SEARCH} from '../constants/constants';

let coursesReducer = (courses = [], action) => {
    switch(action.type)
    {
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        default:
            return courses;
    }
}

export default coursesReducer;