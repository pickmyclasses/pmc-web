import {FETCH_ALL} from '../constants/constants';

let coursesReducer = (courses = [], action) => {
    switch(action.type)
    {
        case FETCH_ALL:
            return action.payload;
        default:
            return courses;
    }
}

export default coursesReducer;