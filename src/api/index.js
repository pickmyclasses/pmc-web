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
      const course = data.data.data;
      injectFakeImageURLToCourse(course);
      injectLocationMapURLToClasses(course.classes);
      // Hide courses that don't have a start time (corrupted data from backend?)
      course.classes = course.classes.filter((x) => !x.offerDate || x.startTime);
      onFetched(course);
    })
  );

const getFakeCourseImageURL = (course) =>
  `https://singlecolorimage.com/get/${getColorByCourse(course).substring(1)}/512x216`;

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

export const fetchClassByID = (classID) => axios.get(`/class/${classID}`);

export const fetchClassesByCourseID = (courseID) => axios.get(`/course/${courseID}/class`);

/**
 * Fetches ```
 * {
 *   scheduledClasses: Array<{classData, course}>,
 *   customEvents: Array<CustomEvent>
 * }
 * ```.
 */
export const fetchScheduledClassesAndCustomEvents = (userID) =>
  axios.get(`schedule?userID=${userID}`).then(({ data }) => {
    for (let { course } of data.data.scheduledClasses) {
      injectFakeImageURLToCourse(course);
    }
    injectLocationMapURLToClasses(data.data.scheduledClasses.map((x) => x.classData));
    return data.data;
  });

// TODO Q: Get rid of all this once the backend has the support for it.
const injectLocationMapURLToClasses = (classes) => {
  for (let classData of classes) {
    const buildingNumber = getBuildingNumberByLocation(classData.location);
    if (buildingNumber) {
      classData.locationMapURL = 'https://map.utah.edu/?buildingnumber=' + buildingNumber;
    }
  }
};

const getBuildingNumberByLocation = (location) => {
  // prettier-ignore
  const ids = [[1,'PARK'],[2,'VOICE'],[3,'DGH'],[4,'KH'],[5,'CSC'],[6,'ST'],[7,'LS'],[8,'AEB'],[9,'JWB'],[10,'PHYS'],[11,'WBB'],[12,'FASB'],[13,'LCB'],[14,'JTB'],[17,'PAB'],[19,'INSCC'],[25,'BEH S'],[26,'SW'],[27,'S BEH'],[28,'MCD'],[29,'FLD H'],[30,'PLAZA'],[32,'STAD'],[35,'UMFA'],[36,'FMAB'],[37,'ARCH'],[38,'ART'],[39,'SCULPT'],[40,'SSB'],[41,'NWPG'],[43,'NS'],[44,'BLDG 44'],[45,'CTIHB'],[46,'LSND'],[48,'GC'],[49,'LNCO'],[51,'SILL'],[52,'ALUMNI'],[53,'UNION'],[56,'CME'],[57,'HEDCO'],[58,'MPL'],[59,'MSRL'],[60,'ESB'],[61,'MCE'],[62,'WEB'],[64,'MEB'],[66,'PMT'],[67,'U CAMPSTOR'],[69,'CPG'],[70,'LAW'],[71,'SAEC'],[72,'BLDG 72'],[73,'PTAB'],[74,'BU C'],[77,'CRCC'],[79,'SFEBB'],[80,'GARFF'],[82,'ASB'],[83,'JFB'],[84,'BIOL'],[85,'HEB'],[86,'M LIB'],[87,'TBBC'],[90,'JHC'],[91,'HPR E'],[92,'HPR N'],[93,'HPRNAT'],[94,'HPR W'],[95,'HPR SW'],[96,'HPR SE'],[97,'DGC'],[98,'KBAC'],[99,'HBF'],[108,'GLF SH'],[109,'DFSS'],[110,'GSESLC'],[112,'MHC'],[114,'KV'],[119,'BRIDGE'],[120,'SKI']];

  return (
    ids.find((x) => x[1] === location?.split(' ')[0])?.[0] ||
    ids.find((x) => x[1] === location?.split(' ').slice(0, 2).join(' '))?.[0]
  );
};

export const addOrUpdateCustomEvent = (userID, customEvent) =>
  axios.post('/schedule?type=custom-event', {
    isNew: !(+customEvent.id >= 0),
    userID,
    customEvent,
  });

export const removeCustomEventByID = (eventID) =>
  axios.put('/schedule?type=custom-event', { id: eventID });

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

export const addClassIDToSchedule = (userID, classID) =>
  axios.post('/schedule?type=class', { userID, classID });

export const removeClassIDFromSchedule = (userID, classID) =>
  axios.put('/schedule?type=class', { userID, classID });

export const fetchReviewsByCourseID = (courseID) =>
  axios.get(`/course/${courseID}/review`).then((data) => data.data.data.reviews);

export const postReview = (courseID, body) => axios.post(`/course/${courseID}/review`, body);
export const postTagsByCourseID = (courseID, body) =>
  axios.post(`/course/${courseID}/tag`, body);
export const putTagsByCourseID = (courseID, body) => axios.put(`/course/${courseID}/tag`, body);

export const fetchReviewTagsByCourseID = (courseID, body) =>
  axios.get(`/course/${courseID}/tag`).then((data) => data.data.data);

export const fetchProfessorByCourseID = (courseID, body) =>
  axios.get(`/course/${courseID}/professor/list`).then((data) => data.data.data);

export const fetchSemestersByCollegeID = (collegeID, body) =>
  axios.get(`/college/${collegeID}/semester/list`).then((data) => data);

export const fetchCollegeList = () => axios.get(`/college/list`).then((data) => data.data.data);
