import { Grid, Rating, Typography } from '@mui/material';
import SubCard from '../Skeleton/SubCard';
import CourseAddReview from './CourseAddReview';
import CourseOverallRatingsBar from './CourseOverallRatingsBar';
import React, { useState, useEffect } from 'react';
import { fetchReviewsByID } from '../../api/index';

function calculateAverageScore({ reviews }) {
  let sum = 0;
  if (reviews == null || reviews.length === 0) {
    return 0;
  }
  for (let step = 0; step < reviews.length; step++) {
    sum += reviews[step].rating;
  }
  return sum / reviews.length;
}

export default function CourseOverallRatings({ courseID }) {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetchReviewsByID(courseID).then((data) => setReviews(data['data']['data']));
  }, []);
  let avgScore = calculateAverageScore({ reviews });

  return (
    <SubCard title=''>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h4' gutterBottom color='primary'>
            Quality - {avgScore.toFixed(1)}/5
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            Overall Quality based on {reviews != null ? reviews.length : 0} ratings
          </Typography>
        </Grid>
        <Grid item>
          <Rating name='read-only' precision={0.1} value={avgScore} readOnly size='large' />
        </Grid>
        <Grid item>
          <CourseOverallRatingsBar reviews={reviews} />
        </Grid>

        <Grid item>
          <CourseAddReview />
        </Grid>
      </Grid>
    </SubCard>
  );
}
