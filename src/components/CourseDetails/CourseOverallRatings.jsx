import { Grid, Rating, Typography } from '@mui/material';
import SubCard from '../Skeleton/SubCard';
import CourseAddReview from './CourseAddReview';
import CourseOverallRatingsBar from './CourseOverallRatingsBar';
import React, { useState, useEffect } from 'react';
import { fetchReviewsByCourseID } from '../../api/index';
import { calculateAverageScore } from '../../utils/index';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
/*
 * Show loading effect when it is still loading or rendering the page
 */
export function LoadingIndicator(props) {
  const isLoading = props.isLoading;
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return null;
  }
}

export default function CourseOverallRatings({ courseID }) {
  const [reviews, setReviews] = useState(null);
  const [rendering, setRendering] = useState(null);
  useEffect(() => {
    fetchReviewsByCourseID(courseID).then((data) =>
      setReviews(data['data']['data'], setRendering(true))
    );
  }, [courseID]);
  let avgScore = calculateAverageScore({ reviews });
  return (
    <SubCard title=''>
      <LoadingIndicator isLoading={rendering == null} />
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
