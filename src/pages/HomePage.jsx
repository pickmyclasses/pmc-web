import React, { useState, useEffect } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import { getCourses } from '../redux/actions/courses';
import { useDispatch } from 'react-redux';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import PageWithScheduler from './PageWithScheduler';

const HomePage = ({ shouldShowScheduler }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    console.log('dispatch(getCourses)) was called at HomePage');
  }, [dispatch]);

  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      <Box sx={{ padding: '16px 8px' }}>
        <Grow in>
          <Grid container justifyContent='space-between' alignItems='stretch'>
            <Grid item xs={12}>
              <CourseCardGrid numColumns={shouldShowScheduler ? 3 : 4} />
            </Grid>
          </Grid>
        </Grow>
      </Box>
    </PageWithScheduler>
  );
};

export default HomePage;
