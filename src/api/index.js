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

/**
 * Fetches the course but also injects the fake image URL. Basically pretends `ImageURL` was an
 * actual field of the course.
 */
export const fetchCourseByID = (courseID) =>
  new Promise((onFetched) =>
    axios.get(`/course/${courseID}`).then((data) => {
      injectFakeImageURLToCourse(data.data.data.course);
      onFetched(data);
    })
  );

const getFakeCourseImageURL = (course) =>
  `https://picsum.photos/seed/${+course.ID + 13}/1280/720`;

const injectFakeImageURLToCourse = (course) =>
  (course.ImageURL = getFakeCourseImageURL(course));

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
      22971, 22951, 22970, 22998, 31826, 28270, 24777, 27266, 27334, 21978, 28354, 30056, 25305,
    ])
  );

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

/**
 * Fetches the list of `{classData, course}` a user has in their shopping cart but also injects
 * the fake image URL. Basically pretends `ImageURL` was an actual field of a course.
 */
export const fetchClassesInShoppingCart = (userID) =>
  new Promise((onFetched) =>
    axios.get(`schedule?user_id=${userID}`).then((data) => {
      for (let { course_data } of data.data.data.scheduled_class_list) {
        injectFakeImageURLToCourse(course_data);
      }
      onFetched(data);
    })
  );

export const fetchRequirements = () => fakeFetchRequirements();

// TODO Q: Search the word "fake" in source code and get rid of all of them.
const fakeFetchRequirements = () =>
  new Promise((onFetched) =>
    onFetched([
      { title: 'Major Requirements', progress: 3, total: 6 },
      { title: 'Major Electives', progress: 4, total: 7 },
      { title: 'Math/Science Electives', progress: 2, total: 5 },
      { title: 'General Education', progress: 6, total: 13 },
    ])
  );

export const addClassIDToShoppingCart = (body) => axios.post('/schedule', body);

export const removeClassIDFromShoppingCart = (body) => axios.put('/schedule', body);

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
