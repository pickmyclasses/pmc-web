import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import Scheduler from '../components/Scheduler';
import ClassResultItem from '../components/ClassResultItem';

export default function HomePage() {
  const [shouldShowScheduler, setShouldShowScheduler] = useState(true);

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs sx={{ marginTop: '24px', overflow: 'auto' }}>
        {/* The following is for place-holding only; we should create a component for result/
         * recommendation lists */}
        <Button onClick={() => setShouldShowScheduler(!shouldShowScheduler)}>
          {shouldShowScheduler ? 'Hide' : 'Show'} scheduler
        </Button>
        {[...new Array(5)].map((_, i) => (
          <ClassResultItem key={i} />
        ))}
      </Grid>
      {shouldShowScheduler && (
        <Grid item xs={3} sx={{ margin: '24px' }}>
          <Scheduler />
        </Grid>
      )}
    </Grid>
  );
}
