import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
// Project Imports
import { fetchCourseByID } from '../api';
import PageWithScheduler from '../pages/PageWithScheduler';
import ReviewDescription from '../components/ReviewInputDetails/ReviewDescription';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewPros from '../components/ReviewInputDetails/ReviewPros';
import ReviewCons from '../components/ReviewInputDetails/ReviewCons';
import CourseContext from '../components/CourseDetails/CourseContext';
import MainCard from '../components/Skeleton/MainCard';
import { gridSpacing } from '../constants/constants';
import Button from '@mui/material/Button';

export default function ReviewPage({ shouldShowScheduler }) {
  const [course, setCourse] = useState([]);
  const [ratingValue, setRatingValue] = useState(3);
  const [proValue, setProValue] = useState([]);
  const [conValue, setConValue] = useState([]);

  useEffect(() => {
    fetchCourseByID(CourseContext.courseID).then(({ data }) => setCourse(data));
  }, []);

  return (
    <PageWithScheduler shouldShowScheduler={!shouldShowScheduler}>
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
              <ReviewDescription course={course} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewRatings
                course={course}
                value={ratingValue}
                onChange={(ratingValue) => {
                  setRatingValue(ratingValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewPros
                value={proValue}
                onChange={(proValue) => {
                  setProValue(proValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewCons
                value={conValue}
                onChange={(conValue) => {
                  setConValue(conValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {proValue}
            </Grid>
            <Grid
              item
              container
              spacing={0}
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Button variant='contained'>Submit</Button>{' '}
            </Grid>
          </Grid>
        </MainCard>
      </Container>
    </PageWithScheduler>
  );
}
