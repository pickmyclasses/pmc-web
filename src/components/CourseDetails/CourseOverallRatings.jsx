import React from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import SubCard from '../Skeleton/SubCard';
import CourseAddReview from './CourseAddReview';
import CourseOverallRatingsBar from './CourseOverallRatingsBar';
export default function CourseOverallRatings({ course }) {
  return (
    <SubCard title=''>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h4' gutterBottom>
            4.2/5
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            Overall Quality based on 10 ratings
          </Typography>
        </Grid>
        <Grid item>
          <Rating name='read-only' precision={0.1} value={4.2} readOnly size='large' />
        </Grid>
        <Grid item>
          <CourseOverallRatingsBar />
        </Grid>

        <Grid item>
          <CourseAddReview />
        </Grid>
      </Grid>
    </SubCard>
  );
}
