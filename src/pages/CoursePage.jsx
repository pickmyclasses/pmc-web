import React, { createContext, createElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Forum, LocalLibrary, ShoppingCart, Widgets } from '@mui/icons-material';
import { Box, CircularProgress, Container } from '@mui/material';
import { fetchClassesByCourseID, fetchCourseByID } from '../api';
import CoursePageTop from '../components/CoursePage/CoursePageTop';
import CourseOverview from '../components/CoursePage/CourseOverview';
import PageWithScheduler from './PageWithScheduler';
import CourseRelated from '../components/CoursePage/CourseRelated';
import CourseReviews from '../components/CoursePage/CourseReviews';
import CourseRegistration from '../components/CoursePage/CourseRegistration';

export const CourseContext = createContext();

export default function CoursePage() {
  const urlParams = useParams();

  const [activeTabName, setActiveTabName] = useState('');
  const [course, setCourse] = useState(null);
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    // Fetch data for the course and classes offered.
    const courseID = urlParams.id;
    fetchCourseByID(courseID).then((data) => setCourse(data.data.data.course));
    fetchClassesByCourseID(courseID).then((data) => setClasses(data.data.data));

    // Figure out the active tab from the URL.
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams]);

  if (!course || !classes) {
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
      <PageWithScheduler>
        <Container maxWidth='xl' sx={{ paddingY: '32px' }}>
          <CourseContext.Provider value={course}>
            {createElement(tabs[activeTabName].content, { course, classes })}
          </CourseContext.Provider>
        </Container>
      </PageWithScheduler>
    </Box>
  );
}

const tabs = {
  '': { title: 'Overview', icon: Widgets, content: CourseOverview },
  'related': { title: 'Related', icon: LocalLibrary, content: CourseRelated },
  'reviews': { title: 'Reviews', icon: Forum, content: CourseReviews },
  'registration': { title: 'Registration', icon: ShoppingCart, content: CourseRegistration },
};
