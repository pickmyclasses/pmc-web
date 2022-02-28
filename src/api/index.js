import axios from 'axios';

export const login = (body) => axios.post('/login', body).then((response) => response.data);

export const register = (body) =>
  axios.post('/register', body).then((response) => response.data);

/**
 * Fetches the course but also injects the fake image URL. Basically pretends `ImageURL` was an
 * actual field of the course.
 */
export const fetchCourseByID = (courseID) =>
  new Promise((onFetched) =>
    axios.get(`/course/${courseID}`).then((data) => {
      // Inject classesOffered. TODO Q: Remove this after Jay finished object combination for
      // fetch course query response.
      const course = data.data.data;
      injectFakeImageURLToCourse(course);
      onFetched(course);
    })
  );

const getFakeCourseImageURL = (course) =>
  `https://picsum.photos/seed/${+course.id + 13}/1280/720`;

const injectFakeImageURLToCourse = (course) =>
  (course.ImageURL = getFakeCourseImageURL(course));

export const fetchAllCourses = () => axios.get('/course/list');

export const fetchHomePageCourses = () => fakeFetchHomePageCourses();

// TODO (QC): Get rid of this, although it might be hard to.
const fakeFetchHomePageCourses = () => {
  const recommendedCategories = {
    'Major Requirements To Go': [22948, 22949, 22963],
    'Hot CS Electives': [22961, 22971, 22951, 22970, 22998, 23000],
    'Hot Gen-Ed Courses': [31826, 28270, 24777, 21978, 28354, 27266],
  };

  return Promise.all(
    Object.entries(recommendedCategories).map(([category, courseIDs]) =>
      Promise.all(courseIDs.map((id) => fetchCourseByID(id))).then((courses) => ({
        category,
        courses,
      }))
    )
  );
};

export const fetchCoursesBySearch = (query) => fakeFetchCoursesBySearch(query);

// TODO (QC): Get rid of this also.
const fakeFetchCoursesBySearch = () => {
  const resultCourseIDs = [
    22966, 23000, 22968, 23068, 23063, 23041, 23001, 22986, 22998, 22964, 22941, 22942, 22961,
    22971, 22951, 22970, 22998, 31826, 28270, 24777, 27266, 27334, 21978, 28354, 30056, 25305,
    22958,
  ];

  return Promise.all(resultCourseIDs.map((id) => fetchCourseByID(id)));
};

new Promise((onFetched) => onFetched());

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

/**
 * Fetches the list of `{classData, course}` a user has in their shopping cart but also injects
 * the fake image URL. Basically pretends `ImageURL` was an actual field of a course.
 */
export const fetchClassesInShoppingCart = (userID) =>
  new Promise((onFetched) =>
    axios.get(`schedule?userID=${userID}`).then((data) => {
      for (let { courseData } of data.data.data.scheduledClassList) {
        injectFakeImageURLToCourse(courseData);
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

export const fetchReviewsByCourseID = (courseID) =>
  axios.get(`/course/${courseID}/review`).then((data) => data.data.data.reviews);

// TODO Q: (1) this is not by ID; (2) simplify object passing and remove object reconstruction.
export const postReviewByID = (reviewObj) =>
  axios.post(`/course/${reviewObj.courseID}/review`, {
    anonymous: reviewObj.anonymous,
    comment: reviewObj.comment,
    cons: reviewObj.cons,
    courseID: reviewObj.courseID,
    pros: reviewObj.pros,
    rating: reviewObj.rating,
    recommended: reviewObj.recommended,
    userID: reviewObj.userID,
  });
