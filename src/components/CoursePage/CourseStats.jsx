import React, { useState, useEffect, useContext } from 'react';
import ReviewPiechart from '../CourseVisuals/ReviewPiechart';
import { Grid, Box, Divider, Typography, Card } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';

export default function CourseStats() {
  const { reviews } = useContext(CourseContext);

  return (
    <>
      <Box>
        <Grid container spacing='32px' marginBottom='16px'>
          <Grid item xs={6}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Distribution</Typography>
                <ReviewPiechart reviews={reviews} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
