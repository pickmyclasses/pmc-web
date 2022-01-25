import React from 'react';
import { Container, Grid } from '@mui/material';
import Scheduler from '../components/Scheduler/Scheduler';

export default function PageWithScheduler({ children, shouldShowScheduler }) {
  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs sx={{ height: '100%', overflow: 'auto' }}>
          {children}
        </Grid>
        {shouldShowScheduler && (
          <Grid item xs={3.75} sx={{ padding: '24px' }}>
            <Scheduler {...schedulerContentPlaceholder} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

// TODO: convert this to a query for backend INSIDE the Scheduler logic (NOT in HomePage).
const schedulerContentPlaceholder = {
  scheduledCourses: [
    {
      name: 'CS 4000',
      title: 'Capstone Design',
      sessions: [
        {
          component: 'Lecture',
          days: [1, 3, 5],
          start: 10 * 60 + 45,
          end: 11 * 60 + 35,
        },
      ],
    },
    {
      name: 'CS 4400',
      title: 'Computer Systems',
      sessions: [
        {
          component: 'Lecture',
          days: [1, 3],
          start: 11 * 60 + 50,
          end: 13 * 60 + 10,
        },
        {
          component: 'Laboratory',
          days: [4],
          start: 12 * 60 + 55,
          end: 13 * 60 + 45,
        },
      ],
    },
  ],
  requirements: [
    { title: 'Major Requirements', progress: 3, total: 6 },
    { title: 'Major Electives', progress: 4, total: 7 },
    { title: 'Math/Science Electives', progress: 2, total: 5 },
    { title: 'General Education', progress: 6, total: 13 },
  ],
};
