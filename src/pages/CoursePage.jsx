import React, {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Forum, PieChart, ShoppingCart, Widgets } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import {
  fetchCourseByID,
  fetchReviewsByCourseID,
  fetchReviewTagsByCourseID,
  fetchProfessorByCourseID,
  fetchSemestersByCollegeID,
  fetchProfessorRanking,
  fetchCourseLoad,
  fetchRatingTrend,
  fetchCoursePopularity,
  fetchReviewDifficultyByCourseID,
  removeBookmarkedCourseID,
  addBookmarkedCourseID,
} from '../api';
import CoursePageTop, { imageHeight } from '../components/CoursePage/CoursePageTop';
import CourseOverview from '../components/CoursePage/CourseOverview';
import CourseStats from '../components/CoursePage/CourseStats';
import CourseReviews from '../components/CoursePage/CourseReviews';
import CourseRegistration from '../components/CoursePage/CourseRegistration';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from '../App';
import { PreventableNavigationContext } from '../components/PreventableNavigation/ContainerWithPreventableNavigation';
import { useSnackbar } from 'notistack';

import Scrollbars from 'react-custom-scrollbars-2';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import { formatCourseName } from 'utils';

export default function CoursePage() {
  const urlParams = useParams();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { bookmarkedCourses } = useContext(SchedulerContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const { enqueueSnackbar } = useSnackbar();

  const [activeTabName, setActiveTabName] = useState('');
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewTags, setReviewTags] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [professorRanking, setProfessorRanking] = useState();
  const [courseLoad, setCourseLoad] = useState();
  const [courseTrend, setCourseTrend] = useState();
  const [coursePopularity, setCoursePopularity] = useState();
  const [difficulty, setDifficulty] = useState();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // This avoids the useRef()'s not updating problem with useEffect().
  // See https://stackoverflow.com/a/67906087)
  // We can potentially include this pattern in the utils collection to reuse it.
  const [containerNode, setContainerNode] = useState(null);
  const containerRef = useCallback((node) => setContainerNode(node), []);

  const refreshCourseData = useCallback(
    (courseID) => {
      fetchCourseByID(courseID, user?.userID).then(setCourse);
      fetchReviewsByCourseID(courseID).then(setReviews);
      fetchReviewDifficultyByCourseID(courseID).then(setDifficulty);
      fetchReviewTagsByCourseID(courseID).then(setReviewTags);
      fetchProfessorByCourseID(courseID).then(setProfessors);
      fetchProfessorRanking(courseID).then(setProfessorRanking);
      fetchCourseLoad(courseID).then(setCourseLoad);
      fetchRatingTrend(courseID).then(setCourseTrend);
      fetchCoursePopularity(courseID).then(setCoursePopularity);
      if (user) fetchSemestersByCollegeID(user.collegeID).then(setSemesters);
    },
    [user]
  );

  useEffect(() => {
    const courseID = urlParams.id;

    // Clear existing course data to force showing loading indication.
    if (+courseID !== +course?.id) {
      setCourse(null);
      setReviews(null);
    }

    // Fetch related data.
    refreshCourseData(courseID);

    // Figure out the active tab from the URL.
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams, course?.id, refreshCourseData]);

  useEffect(() => {
    // Go to top of page (right below the banner image) when URL changes.
    const pageContent = containerNode?.children[0].children[0];
    if (pageContent) pageContent.scrollTo(0, Math.min(pageContent.scrollTop, imageHeight));
  }, [urlParams, containerNode]);

  useEffect(
    () => setIsBookmarked(bookmarkedCourses.some((x) => x.id === course?.id)),
    [bookmarkedCourses, course?.id]
  );

  const handleIsBookmarkedChange = useCallback(
    (newIsBookmarked) => {
      if (!user)
        return void navigateIfAllowed('/auth', null, {
          state: { linkTo: location.pathname },
        });

      if (newIsBookmarked) {
        addBookmarkedCourseID(user.userID, course.id);
        enqueueSnackbar('Added bookmark for ' + formatCourseName(course.catalogCourseName));
      } else {
        removeBookmarkedCourseID(user.userID, course.id);
        enqueueSnackbar('Removed bookmark for ' + formatCourseName(course.catalogCourseName));
      }
      setIsBookmarked(newIsBookmarked);
    },
    [user, navigateIfAllowed, enqueueSnackbar, course, location.pathname]
  );

  return (
    <ContainerWithLoadingIndication
      isLoading={[
        refreshCourseData,
        course,
        reviews,
        difficulty,
        reviewTags,
        professors,
        professorRanking,
        courseLoad,
        courseTrend,
        coursePopularity,
      ].some((x) => x == null)}
    >
      <Box ref={containerRef} width='100%' height='100%' minHeight={0}>
        <OnTopScrollBars>
          <CoursePageTop
            course={course}
            tabs={tabs}
            activeTabName={activeTabName}
            isBookmarked={isBookmarked}
            onIsBookmarkedChange={handleIsBookmarkedChange}
          />
          <Container maxWidth='xl' sx={{ paddingTop: '32px' }}>
            <CourseContext.Provider
              value={{
                refreshCourseData,
                course,
                reviews,
                difficulty,
                reviewTags,
                professors,
                semesters,
                professorRanking,
                courseLoad,
                courseTrend,
                coursePopularity,
                isBookmarked,
                setIsBookmarked: handleIsBookmarkedChange,
              }}
            >
              {createElement(tabs[activeTabName].content)}
            </CourseContext.Provider>
          </Container>
        </OnTopScrollBars>
      </Box>
    </ContainerWithLoadingIndication>
  );
}

export const CourseContext = createContext(null);

const tabs = {
  '': { title: 'Overview', icon: Widgets, content: CourseOverview },
  'stats': { title: 'Stats', icon: PieChart, content: CourseStats },
  'reviews': { title: 'Reviews', icon: Forum, content: CourseReviews },
  'registration': { title: 'Registration', icon: ShoppingCart, content: CourseRegistration },
};

const OnTopScrollBars = ({ children }) => {
  /**
   * For some reason react-custom-scrollbars does not allow "inheriting" styles. It requires
   * us to always pass in this base styles when styling.
   * @see https://stackoverflow.com/a/54973078
   */
  const defaultScrollBarsStyle = {
    top: '2px',
    bottom: '2px',
    right: '2px',
    borderRadius: '3px',
  };

  return (
    <Scrollbars
      autoHide
      renderTrackVertical={({ style, ...props }) => (
        <div style={{ ...style, ...defaultScrollBarsStyle, zIndex: 1002 }} {...props} />
      )}
    >
      {children}
    </Scrollbars>
  );
};
