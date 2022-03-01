import React, { useContext } from 'react';
import ReviewPieChart from '../CourseVisuals/ReviewPieChart';
import { Grid, Box, Typography, Card } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import ReviewDotLineChart from '../CourseVisuals/ReviewDotLineChart';

export default function CourseStats() {
  const { reviews } = useContext(CourseContext);
  return (
    <>
      <Box>
        <Grid container spacing='32px' marginBottom='16px'>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Distribution</Typography>
                <ReviewPieChart reviews={reviews} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Over Time</Typography>
                <ReviewDotLineChart reviews={reviews} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
