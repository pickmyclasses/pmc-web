import axios from 'axios';
import { URL } from '../constants/constants';

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

// TODO: Use this version instead.
export const fetchCourseByID2 = (courseID) => axios.get(`${URL}/course/${courseID}`);

export const fetchAllCourses = () => axios.get(`${URL}/course`);

export const fetchCoursesBySearch = ({ department, number }) =>
  axios.get(`${URL}/search?department=${department}&number=${number}`);

export const fetchClassByID = (classID) => axios.get(`${URL}/class?id=${classID}`);

export const fetchClassesInShoppingCart = () => fakeFetchClassesInShoppingCart();

// TODO: Actually fetch from backend and get rid of this.
const fakeFetchClassesInShoppingCart = () =>
  new Promise((resolve) => resolve({ data: ['10020', '10021', '10042'] }));
