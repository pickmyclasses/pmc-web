import React, { createContext, createElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Forum, QueryStats, ShoppingCart, Widgets } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { fetchCourseByID, fetchReviewsByCourseID } from '../api';
import CoursePageTop from '../components/CoursePage/CoursePageTop';
import CourseOverview from '../components/CoursePage/CourseOverview';
import CourseStats from '../components/CoursePage/CourseStats';
import CourseReviews from '../components/CoursePage/CourseReviews';
import CourseRegistration from '../components/CoursePage/CourseRegistration';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import Scrollbars from 'react-custom-scrollbars-2';

export default function CoursePage() {
  const urlParams = useParams();

  const [activeTabName, setActiveTabName] = useState('');
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // Fetch data for the course, classes offered, and reviews.
    const courseID = urlParams.id;
    fetchCourseByID(courseID).then(setCourse);
    fetchReviewsByCourseID(courseID).then(setReviews);

    // Figure out the active tab from the URL.
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams]);

  return (
    <ContainerWithLoadingIndication isLoading={!course || !reviews}>
      <Box width='100%' height='100%' minHeight={0} sx={{ overflowY: 'sceroll' }}>
        <OnTopScrollBars>
          <CoursePageTop course={course} tabs={tabs} activeTabName={activeTabName} />
          <Container maxWidth='xl' sx={{ paddingY: '32px' }}>
            <CourseContext.Provider value={{ course, reviews }}>
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
 *   reviews: Array<Object>
 * }>}
 */
export const CourseContext = createContext();

const tabs = {
  '': { title: 'Overview', icon: Widgets, content: CourseOverview },
  'stats': { title: 'Stats', icon: QueryStats, content: CourseStats },
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
    background: 'rgba(255, 255, 255, 0.111)',
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
