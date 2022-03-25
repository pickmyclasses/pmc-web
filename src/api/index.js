import axios from 'axios';
import Color from 'color';

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
  'https://d2z1w4aiblvrwu.cloudfront.net/ad/ZRoa/default-large.jpg';
// `https://singlecolorimage.com/get/${getColorByCourse(course).substring(1)}/512x216`;

export const getColorByCourse = (course) =>
  '#' +
  Color('#' + (parseInt(course.catalogCourseName, 36) * 2531).toString(16).slice(-3))
    .desaturate(0.667)
    .lightness(50)
    .rgbNumber()
    .toString(16);

const injectFakeImageURLToCourse = (course) =>
  (course.ImageURL = getFakeCourseImageURL(course));

export const fetchAllCourses = () => axios.get('/course/list');

export const fetchHomePageCourses = () => fakeFetchHomePageCourses();

// TODO (QC): Get rid of this, although it might be hard to.
const fakeFetchHomePageCourses = () => {
  const recommendedCategories = {
    // 'Major Requirements To Go': [22963],
    // 'Major Requirements To Go': [22948, 22949, 22963],
    // 'Highest Rated Electives': [22961, 22971, 22951, 22970, 22998, 23000],
    'Highest Rated Math/Science Courses': [27247, 27245, 22417, 22933, 21976, 27266],
    'Highest Rated Gen-Ed Courses': [
      31826, 28270, 24777, 21978, 28354, 29897, 30546, 24764, 21072, 31570,
    ],
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

export const fetchCoursesBySearch = (body) =>
  axios.post('/course/search', body).then((response) => {
    // return response.data.data.data;
    return fakeFetchCoursesBySearch(response.data.data);
  });

// TODO (QC): Get rid of this also.
const fakeFetchCoursesBySearch = (res) => {
  const resultCourseIDs = res || [
    22966, 23000, 22968, 23068, 23063, 23041, 23001, 22986, 22998, 22964, 22941, 22942, 22961,
    22971, 22951, 22970, 22998, 31826, 28270, 24777, 27266, 27334, 21978, 28354, 30056, 25305,
    22958, 22938, 27252,
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
  axios.get(`schedule?userID=${userID}`).then((data) => {
    for (let { courseData } of data.data.data.scheduledClassList) {
      injectFakeImageURLToCourse(courseData);
    }
    return data.data.data.scheduledClassList.map(({ classData, courseData: course }) => ({
      classData,
      course,
    }));
  });

export const fetchRequirements = () => fakeFetchRequirements();

// TODO Q: Search the word "fake" in source code and get rid of all of them.
const fakeFetchRequirements = () =>
  new Promise((onFetched) =>
    onFetched([
      { title: 'Major Requirements', progress: 0, total: 6 },
      { title: 'Major Electives', progress: 0, total: 7 },
      { title: 'Math/Science Electives', progress: 0, total: 5 },
      { title: 'General Education', progress: 0, total: 13 },
    ])
  );

/**
 * @param {{
 *   userID: Number,
 *   classID: Number,
 *   semesterID: 1,
 * }} body
 */
export const addClassIDToShoppingCart = (body) => axios.post('/schedule', body);

/**
 * @param {{
 *   userID: Number,
 *   classID: Number,
 *   semesterID: 1,
 * }} body
 */
export const removeClassIDFromShoppingCart = (body) => axios.put('/schedule', body);

export const fetchReviewsByCourseID = (courseID) =>
  axios.get(`/course/${courseID}/review`).then((data) => data.data.data.reviews);

export const postReview = (courseID, body) => axios.post(`/course/${courseID}/review`, body);
export const postTagsByCourseID = (courseID, body) =>
  axios.post(`/course/${courseID}/tag`, body);
export const putTagsByCourseID = (courseID, body) => axios.put(`/course/${courseID}/tag`, body);

export const fetchReviewTagsByCourseID = (courseID, body) =>
  axios.get(`/course/${courseID}/tag`).then((data) => data.data.data);
