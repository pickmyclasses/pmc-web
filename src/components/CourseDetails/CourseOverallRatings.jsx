import { Grid, Rating, Typography } from '@mui/material';
import SubCard from '../Skeleton/SubCard';
import CourseAddReview from './CourseAddReview';
import CourseOverallRatingsBar from './CourseOverallRatingsBar';
import React from 'react';
import { calculateAverageScore } from '../../utils/index';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CourseFilterReview from '../../components/CourseDetails/CourseFilterReview';

export default function CourseOverallRatings({ reviews }) {
  let avgScore = calculateAverageScore({ reviews });
  return (
    <>
      <SubCard title=''>
        <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <Typography variant='h4' gutterBottom color='primary'>
                Quality - {avgScore.toFixed(1)}/5
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' gutterBottom>
                {reviews != null ? reviews.length : 0} global ratings
              </Typography>
            </Grid>
            <Grid item>
              <Rating name='read-only' precision={0.1} value={avgScore} readOnly size='large' />
            </Grid>

            <Grid item>
              <CourseOverallRatingsBar reviews={reviews} />
            </Grid>
            <Stack direction='row' justifyContent='end'>
              <CourseFilterReview />
            </Stack>
          </Grid>
        </Box>
      </SubCard>

      <Grid>
        <Box sx={{ marginY: '12px' }}>
          <Grid container direction='column' spacing={1}>
            {' '}
            <CourseAddReview />
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
