import axios from 'axios';

export const postReviewByID = (reviewObj) =>
  axios
    .post(`/course/${reviewObj.course_id}/review`, {
      anonymous: reviewObj.anonymous,
      comment: reviewObj.comment,
      cons: reviewObj.cons,
      course_id: reviewObj.course_id,
      pros: reviewObj.pros,
      rating: reviewObj.rating,
      recommended: reviewObj.recommended,
      user_id: reviewObj.user_id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      console.log(reviewObj);
    });
export const fetchCourseByID = (courseID) => axios.get(`/course/${courseID}`);

export const fetchAllCourses = () => axios.get('/course');

export const fetchHomePageCourses = () => fakeFetchHomePageCourses();

// TODO (QC): Get rid of this, although it might be hard to.
const fakeFetchHomePageCourses = () =>
  new Promise((onFetched) => {
    const recommendedCategories = {
      'Major Requirements To Go': [22960, 22963],
      'Hot CS Electives': [22961, 22971, 22951, 22970, 22968],
      'Hot Gen-Ed Courses': [26280, 24783, 25073, 24764, 30556, 28270],
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
      23000, 23068, 23063, 22938, 23041, 23001, 22986, 22998, 22964, 23064, 22941, 22942,
    ])
  );

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

export const fetchClassesInShoppingCart = () => fakeFetchClassesInShoppingCart();

// TODO: Actually fetch from backend and get rid of this.
const fakeFetchClassesInShoppingCart = () =>
  new Promise((onFetched) => onFetched({ data: [10774, 10778, 13829, 14553] }));
