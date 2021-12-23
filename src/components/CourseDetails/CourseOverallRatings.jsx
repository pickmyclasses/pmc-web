import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CourseChart from './CourseBarChart';

//Project Imports
import SubCard from '../Skeleton/SubCard';

function ComputeRatingNum(course) {
  // let totalNum = 0;
  // for (let num of course.overall_ratings) {
  //   totalNum += num;
  // }
  // return totalNum;
  return 0;
}

function ComputeOverallRating(course) {
  // let totalNum = ComputeRatingNum(course);

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
  let rating = ComputeOverallRating(course);

  return (
    <SubCard title=''>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <MuiTypography variant='h4' gutterBottom>
            {rating}/5
          </MuiTypography>
        </Grid>
        <Grid item>
          <MuiTypography variant='subtitle1' gutterBottom>
            Overall Quality based on {ComputeRatingNum(course)} ratings
          </MuiTypography>
        </Grid>
        <Grid item>
          <Rating name='read-only' precision={0.1} value={rating} readOnly size='large' />
        </Grid>
        <Grid item>
          <CourseChart />
        </Grid>
      </Grid>
    </SubCard>
  );
}
