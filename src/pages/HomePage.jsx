import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import Scheduler from '../components/Scheduler';
import CourseCardGrid from '../components/CourseCardGrid';

export default function HomePage() {
  const [shouldShowScheduler, setShouldShowScheduler] = useState(true);

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs sx={{ height: '100%', padding: '16px', overflow: 'auto' }}>
        {/* The following is for place-holding only; we should create a component for result/
         * recommendation lists */}
        <Button onClick={() => setShouldShowScheduler(!shouldShowScheduler)}>
          {shouldShowScheduler ? 'Hide' : 'Show'} scheduler
        </Button>
        <CourseCardGrid courses={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
      </Grid>
      {shouldShowScheduler && (
        <Grid item xs={3} sx={{ margin: '24px' }}>
          <Scheduler />
        </Grid>
      )}
    </Grid>
  );
}
