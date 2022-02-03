import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Container, CircularProgress } from '@mui/material';
// Project Imports
import { fetchCourseByID, fetchClassesByCourseID } from '../../src/api/index';
import PageWithScheduler from '../pages/PageWithScheduler';
import CourseDescriptionSubCard from '../components/CourseDetails/CourseDescriptionSubCard';
import CourseEnrollmentSubCard from '../components/CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../components/CourseDetails/CourseDetails';
import MainCard from '../components/Skeleton/MainCard';
import CourseOverallRatings from '../components/CourseDetails/CourseOverallRatings';
import CourseReviews from '../components/CourseDetails/CourseReviews';
import { formatCourseName } from '../utils';
// Theme constants
import { gridSpacing } from '../constants/constants';

export const CourseContext = createContext();

// TODO (KS): draw the horizontal bars for student's ratings.

export default function CoursePage({ shouldShowScheduler }) {
  const [course, setCourse] = useState(null);
  const [classes, setClasses] = useState(null);

  const urlParams = useParams();

  useEffect(() => {
    const courseID = urlParams['id'];
    fetchCourseByID(courseID).then((data) => setCourse(data['data']['data']['course']));
    fetchClassesByCourseID(courseID).then((data) => setClasses(data['data']['data']));
  }, [urlParams]);

  if (!course || !classes) {
    return (
      <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      </PageWithScheduler>
    );
  }

  /* TODO (QC):
   *  1. Refactor these sub-components (SubCard's) so that each component only take as props
   *     what it actually needs, rather than taking an entire course object.
   *  2. gridSpacing is looking very bad as a global constant. Better may be to create a SubCard
   *     component that is shared by all the sub-components.
   *  3. CourseOverallRatings -> CourseOverallRating, and CourseReviews -> CourseReview. */
  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        <CourseContext.Provider value={course}>
          <MainCard
            title={`${formatCourseName(course['CatalogCourseName'])} — ${course['Title']}`}
          >
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12}>
                <CourseDescriptionSubCard course={course}></CourseDescriptionSubCard>
              </Grid>

              <Grid item xs={12} sm={12}>
                <CourseEnrollmentSubCard course={course}></CourseEnrollmentSubCard>
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* TODO (QC): Inconsistent component/file naming. Also it may be better to let
                 *  the table fetch the list fo classes by itself. */}
                <EnhancedTable classes={classes} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CourseOverallRatings courseID={course.ID}></CourseOverallRatings>
              </Grid>
              <Grid item xs={12} sm={12}>
                <CourseReviews courseID={course.ID}></CourseReviews>
              </Grid>
            </Grid>
          </MainCard>
        </CourseContext.Provider>
      </Container>
    </PageWithScheduler>
  );
}
