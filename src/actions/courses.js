// import everything from the api
import * as api from '../api';


// thunks allow us to write async functions in React
// Action Creators - functions that return actions
// payload - the data structure that stores all of our courses
export const getCourses = () => async (dispatch) => 
{
    try
    {
        // data - the array of course JSONs
        const { data } = await api.fetchCourses();

        const action = { type: 'FETCH_ALL', payload: data };

        dispatch(action);

    }catch(error)
    {
        console.log(error.message);
    }    
}

export const getCoursesBySearch = (searchQuery) => async (dispatch) => {
    try{
        
        const { data } = await api.fetchCoursesBySearch(searchQuery);

        console.log(data);

    }catch(error)
    {
        console.log(error.message);
    }
}

