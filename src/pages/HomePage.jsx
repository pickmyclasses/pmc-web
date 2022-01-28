import React, { useEffect } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import { getCourses } from '../redux/actions/courses';
import { useDispatch } from 'react-redux';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import PageWithScheduler from './PageWithScheduler';

export default function HomePage({ shouldShowScheduler }) {
  const dispatch = useDispatch();

  // TODO (QC): Discuss whether we still want to use Redux. If not, refactor the following to
  // use the fetch functions in /src/api directly.
  useEffect(() => {
    dispatch(getCourses());
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
}
