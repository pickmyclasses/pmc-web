import React, { createContext, createElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Forum, LocalLibrary, ShoppingCart, Widgets } from '@mui/icons-material';
import { Box, CircularProgress, Container } from '@mui/material';
import { fetchClassesByCourseID, fetchCourseByID } from '../api';
import CoursePageTop from '../components/CoursePage/CoursePageTop';
import CourseOverview from '../components/CoursePage/CourseOverview';
import CourseRelated from '../components/CoursePage/CourseRelated';
import CourseReviews from '../components/CoursePage/CourseReviews';
import CourseRegistration from '../components/CoursePage/CourseRegistration';
import { fetchReviewsByCourseID } from '../api/index';

export default function CoursePage() {
  const urlParams = useParams();

  const [activeTabName, setActiveTabName] = useState('');
  const [course, setCourse] = useState(null);
  const [classes, setClasses] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // Fetch data for the course, classes offered, and reviews.
    const courseID = urlParams.id;
    fetchCourseByID(courseID).then((data) => setCourse(data.data.data.course));
    fetchClassesByCourseID(courseID).then((data) => setClasses(data.data.data));
    fetchReviewsByCourseID(courseID).then((data) => setReviews(data.data.data));

    // Figure out the active tab from the URL.
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams]);

  if (!course || !classes || !reviews) {
    // Loading, render centered spinning circle.
    return (
      <Box width='100%' height='100%' display='flex'>
        <CircularProgress sx={{ margin: 'auto' }} />
      </Box>
    );
  }

  return (
    <Box width='100%' height='100%' minHeight={0} sx={{ overflowY: 'scroll' }}>
      <CoursePageTop course={course} tabs={tabs} activeTabName={activeTabName} />
      <Container maxWidth='xl' sx={{ paddingY: '32px' }}>
        <CourseContext.Provider value={{ course, classes, reviews }}>
          {createElement(tabs[activeTabName].content)}
        </CourseContext.Provider>
      </Container>
    </Box>
  );
}

/**
 * @type {React.Context<{
 *   course: Object,
 *   classes: Array<Object>,
 *   reviews: Array<Object>
 * }>}
 */
export const CourseContext = createContext();

const tabs = {
  '': { title: 'Overview', icon: Widgets, content: CourseOverview },
  'related': { title: 'Related', icon: LocalLibrary, content: CourseRelated },
  'reviews': { title: 'Reviews', icon: Forum, content: CourseReviews },
  'registration': { title: 'Registration', icon: ShoppingCart, content: CourseRegistration },
};
