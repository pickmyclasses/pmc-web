import axios from 'axios';

export const login = ({ email, password }) => {
  const promise = axios.post('/login', {
    email: email,
    password: password,
  });
  return promise.then((response) => response.data);
};

export const register = ({ email, firstName, lastName, college, password, repassword }) => {
  // TODO Q: Maybe write a global util function to convert all keys in an object into snake
  // case.
  const data = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    college: college,
    password: password,
    re_password: repassword,
  };
  const promise = axios.post('/register', data);
  return promise.then((response) => response.data);
};

export const fetchCourseByID = (courseID) => axios.get(`/course/${courseID}`);

export const fetchAllCourses = () => axios.get('/course/list');

export const fetchHomePageCourses = () => fakeFetchHomePageCourses();

// TODO (QC): Get rid of this, although it might be hard to.
const fakeFetchHomePageCourses = () =>
  new Promise((onFetched) => {
    const recommendedCategories = {
      'Major Requirements To Go': [22948, 22949, 22963],
      'Hot CS Electives': [22961, 22971, 22951, 22970, 22998, 23000],
      'Hot Gen-Ed Courses': [31826, 28270, 24777, 21978, 28354, 27266],
    };

    onFetched(
      Object.entries(recommendedCategories).map(([category, courseIDs]) => ({
        category,
        courseIDs,
      }))
    );
  });

export const fetchCoursesBySearch = (query) => fakeFetchCoursesBySearch(query);

// TODO (QC): Get rid of this also.
const fakeFetchCoursesBySearch = () =>
  new Promise((onFetched) =>
    onFetched([
      22966, 23000, 22968, 23068, 23063, 23041, 23001, 22986, 22998, 22964, 22941, 22942, 22961,
      22971, 22951, 22970, 22998, 31826, 28270, 24777, 27266, 27334, 21978, 28354, 30056, 31826,
    ])
  );

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

// TODO Q: Remove this after backend migrates and combines APIs.
// const shoppingCartAPIEntryURL = 'http://localhost:5000';
const shoppingCartAPIEntryURL = 'https://pmc-schedule-api.herokuapp.com';

export const fetchClassIDsInShoppingCart = (userID, semesterID) =>
  axios.get(`${shoppingCartAPIEntryURL}/schedule/${userID}/${semesterID}`);
// fakeFetchClassIDsInShoppingCart();

// TODO Q: Actually fetch from backend and get rid of this.
// const fakeFetchClassIDsInShoppingCart = () =>
//   new Promise((onFetched) =>
//     onFetched({
//       data: [10795, 10801, 15812, 15813, 17099].map((x) => ({ class_id: x })),
//     })
//   );

export const addClassIDToShoppingCart = (body) =>
  axios.post(`${shoppingCartAPIEntryURL}/schedule/add`, body);

export const removeClassIDFromShoppingCart = (body) =>
  axios.post(`${shoppingCartAPIEntryURL}/schedule/remove`, body);

export const fetchReviewsByCourseID = (courseID) => axios.get(`/course/${courseID}/review`);

// TODO Q: (1) this is not by ID; (2) simplify object passing and remove object reconstruction.
export const postReviewByID = (reviewObj) =>
  axios.post(`/course/review`, {
    anonymous: reviewObj.anonymous,
    comment: reviewObj.comment,
    cons: reviewObj.cons,
    course_id: reviewObj.course_id,
    pros: reviewObj.pros,
    rating: reviewObj.rating,
    recommended: reviewObj.recommended,
    user_id: reviewObj.user_id,
  });
