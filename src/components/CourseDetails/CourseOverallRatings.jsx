import React from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import SubCard from '../Skeleton/SubCard';
import CourseAddReview from './CourseAddReview';

function computeRatingNum(course) {
  // let totalNum = 0;
  // for (let num of course.overall_ratings) {
  //   totalNum += num;
  // }
  // return totalNum;
  return 0;
}

function computeOverallRating(course) {
  // let totalNum = computeRatingNum(course);

  // return (
  //   (courseData.overall_ratings[0] +
  //     courseData.overall_ratings[1] * 2 +
  //     courseData.overall_ratings[2] * 3 +
  //     courseData.overall_ratings[3] * 4 +
  //     courseData.overall_ratings[4] * 5) /
  //   totalNum
  // ).toFixed(2);
  return 0;
}

export default function CourseOverallRatings({ course }) {
  let rating = computeOverallRating(course);

  return (
    <SubCard title=''>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h4' gutterBottom>
            {rating}/5
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            Overall Quality based on {computeRatingNum(course)} ratings
          </Typography>
        </Grid>
        <Grid item>
          <Rating name='read-only' precision={0.1} value={rating} readOnly size='large' />
        </Grid>
        <Grid item>
          <CourseAddReview />
        </Grid>
      </Grid>
    </SubCard>
  );
}
