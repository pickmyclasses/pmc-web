import React, {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import { Forum, PieChart, ShoppingCart, Widgets } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import {
  fetchCourseByID,
  fetchReviewsByCourseID,
  fetchReviewTagsByCourseID,
  fetchProfessorByCourseID,
  fetchSemestersByCollegeID,
} from '../api';
import CoursePageTop, { imageHeight } from '../components/CoursePage/CoursePageTop';
import CourseOverview from '../components/CoursePage/CourseOverview';
import CourseStats from '../components/CoursePage/CourseStats';
import CourseReviews from '../components/CoursePage/CourseReviews';
import CourseRegistration from '../components/CoursePage/CourseRegistration';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from '../App';

import Scrollbars from 'react-custom-scrollbars-2';

export default function CoursePage() {
  const urlParams = useParams();

  const [activeTabName, setActiveTabName] = useState('');
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewTags, setReviewTags] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [semesters, setSemesters] = useState([]);
  // This avoids the useRef()'s not updating problem with useEffect().
  // See https://stackoverflow.com/a/67906087)
  // We can potentially include this pattern in the utils collection to reuse it.
  const [containerNode, setContainerNode] = useState(null);
  const containerRef = useCallback((node) => setContainerNode(node), []);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const courseID = urlParams.id;

    // Clear existing course data to force showing loading indication.
    if (+courseID !== +course?.id) {
      setCourse(null);
      setReviews(null);
    }

    // Fetch data for the course, classes offered, reviews tags, professors, semesters.
    fetchCourseByID(courseID).then(setCourse);
    fetchReviewsByCourseID(courseID).then(setReviews);
    fetchReviewTagsByCourseID(courseID).then(setReviewTags);
    fetchProfessorByCourseID(courseID).then(setProfessors);
    if (user) {
      //fetchSemestersByCourseID(user.collegeID).then((data) => setSemesters(data));
      fetchSemestersByCollegeID(user.collegeID).then((data) => setSemesters(data.data));
    }
    // Figure out the active tab from the URL.
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams, course?.id]);

  console.log(semesters);

  useEffect(() => {
    // Go to top of page (right below the banner image) when URL changes.
    const pageContent = containerNode?.children[0].children[0];
    if (pageContent) pageContent.scrollTo(0, Math.min(pageContent.scrollTop, imageHeight));
  }, [urlParams, containerNode]);
  return (
    <ContainerWithLoadingIndication isLoading={!course || !reviews}>
      <Box ref={containerRef} width='100%' height='100%' minHeight={0}>
        <OnTopScrollBars>
          <CoursePageTop course={course} tabs={tabs} activeTabName={activeTabName} />
          <Container maxWidth='xl' sx={{ paddingTop: '32px' }}>
            <CourseContext.Provider
              value={{ course, reviews, reviewTags, professors, semesters }}
            >
              {createElement(tabs[activeTabName].content)}
            </CourseContext.Provider>
          </Container>
        </OnTopScrollBars>
      </Box>
    </ContainerWithLoadingIndication>
  );
}

/**
 * @type {React.Context<{
 *   course: Object,
 *   reviews: Array<Object>,
 *   reviewTags: Array<Object>,
 * }>}
 */
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
