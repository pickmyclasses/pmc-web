import axios from 'axios';
import {URL} from '../constants/constants';

// https://localhost:3000/course

// GET request for the courses
export const fetchCourses = () => axios.get(URL + "/course");

export const fetchCoursesBySearch = (searchQuery) => axios.get(URL + `/course/search?searchQuery=${searchQuery.search}`);
