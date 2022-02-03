import axios from 'axios';

export const login = ({ email, password }) => {
  const promise = axios.post('/login', {
    email: email,
    password: password,
  });
  return promise.then((response) => response.data);
};

export const register = (userData) => axios.post('/register');

export const fetchCourseByID = (courseID) => axios.get(`/course/${courseID}`);

export const fetchAllCourses = () => axios.get('/course/list');

export const fetchHomePageCourses = () => fakeFetchHomePageCourses();

// TODO (QC): Get rid of this, although it might be hard to.
const fakeFetchHomePageCourses = () =>
  new Promise((onFetched) => {
    const recommendedCategories = {
      'Major Requirements To Go': [22948, 22949, 22963],
      'Hot CS Electives': [22961, 22971, 22951, 22970, 22998],
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
      22966, 23000, 22968, 23068, 23063, 23041, 23001, 22986, 22998, 22964, 22941, 22942,
    ])
  );

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

export const fetchClassIDsInShoppingCart = () => fakeFetchClassIDsInShoppingCart();

// TODO Q: Actually fetch from backend and get rid of this.
const fakeFetchClassIDsInShoppingCart = () =>
  new Promise((onFetched) => onFetched({ data: [10795, 10801, 15812, 15813, 17099] }));

// TODO Q: Backend should fix this irregular URL entry.
export const postAddClassIDToShoppingCart = (body) =>
  alert('** trying to post ' + JSON.stringify(body));
// axios.post(`https://pmc-schedule-api.herokuapp.com/schedule`, body);

export const fetchReviewsByID = (courseID) => axios.get(`/course/${courseID}/review`);

// TODO Q: (1) this is not by ID; (2) simplify object passing and remove object reconstruction.
export const postReviewByID = (reviewObj) =>
  axios.post(`/course/review`, {
    // anonymous: reviewObj.anonymous,
    comment: reviewObj.comment,
    cons: reviewObj.cons,
    course_id: reviewObj.course_id,
    pros: reviewObj.pros,
    rating: reviewObj.rating,
    // recommended: reviewObj.recommended,
    user_id: reviewObj.user_id,
  });
