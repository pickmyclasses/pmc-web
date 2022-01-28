import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
// Project Imports
import { fetchCourseByID, fetchClassesByCourseID } from '../../src/api/index';
import PageWithScheduler from '../pages/PageWithScheduler';
import CourseDescriptionSubCard from '../components/CourseDetails/CourseDescriptionSubCard';
import CourseEnrollmentSubCard from '../components/CourseDetails/CourseEnrollmentSubCard';
import CourseDetails from '../components/CourseDetails/CourseDetails';
import MainCard from '../components/Skeleton/MainCard';
import CourseOverallRatings from '../components/CourseDetails/CourseOverallRatings';
import CourseReviews from '../components/CourseDetails/CourseReviews';
import CourseContext from '../components/CourseDetails/CourseContext';
// Theme constants
import { gridSpacing } from '../constants/constants';

// TODO (KS): draw the horizontal bars for student's ratings.

export default function CoursePage({ shouldShowScheduler }) {
  const [course, setCourse] = useState([]);
  const [classes, setClasses] = useState([]);

  const courseParam = useParams();

  useEffect(() => {
    fetchCourseByID(courseParam.id).then(({ data }) => setCourse(data));
    fetchClassesByCourseID(courseParam.id).then(({ data }) => setClasses(data));
  }, [courseParam]);

  // Record the ID of the course into the context (global variable)
  CourseContext.courseID = course.id;
  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        <MainCard title={course.department + ' ' + course.number + ' ' + course.name}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
              <CourseDescriptionSubCard course={course}></CourseDescriptionSubCard>
            </Grid>

            <Grid item xs={12} sm={12}>
              <CourseEnrollmentSubCard course={course}></CourseEnrollmentSubCard>
            </Grid>

            <Grid item xs={12} sm={12}>
              <CourseDetails classes={classes} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CourseOverallRatings course={course}></CourseOverallRatings>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CourseReviews course={course}></CourseReviews>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CourseReviews course={course}></CourseReviews>
            </Grid>
          </Grid>
        </MainCard>
      </Container>
    </PageWithScheduler>
  );
}
