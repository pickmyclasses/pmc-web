import axios from 'axios';
import { URL } from '../constants/constants';

export const fetchCourseByID = (courseID) => axios.get(`${URL}/course/${courseID}`);

export const fetchAllCourses = () => axios.get(`${URL}/course`);

export const fetchCoursesBySearch = ({ department, number }) =>
  axios.get(`${URL}/search?department=${department}&number=${number}`);

export const fetchClassByID = (classID) => axios.get(`${URL}/class?id=${classID}`);

// TODO (QC): This query is incorrect. We want to fetch classes that belong to some courseID,
// not classes with courseID. However, the JSON server does not respond to the correct query
// ('/course/<courseID>/class/list'), and we need to fix this.
export const fetchClassesByCourseID = (courseID) => fetchClassByID(courseID);
// export const fetchClassesByCourseID = (courseID) =>
//   axios.get(`${URL}/course/${courseID}/class/list`);

export const fetchClassesInShoppingCart = () => fakeFetchClassesInShoppingCart();

// TODO: Actually fetch from backend and get rid of this.
const fakeFetchClassesInShoppingCart = () =>
  new Promise((resolve) => resolve({ data: ['10020', '10021', '10042'] }));
