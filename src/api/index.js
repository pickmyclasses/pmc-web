import axios from 'axios';
import { URL } from '../constants/constants';

// https://localhost:3000/course

// GET request for the courses
export const fetchCourses = () => axios.get(URL + '/course');

export const fetchCoursesBySearch = (searchQuery) =>
  axios.get(URL + `/search?department=${searchQuery.department}&number=${searchQuery.number}`);

export const fetchCourseByID = (CourseID, SetCourse) => {
  axios
    .get(`${URL}${CourseID}`)
    .then((response) => {
      SetCourse(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
