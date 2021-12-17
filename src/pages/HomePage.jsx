import React, { useState, useEffect } from 'react';
import { Grow, Grid, Button } from '@mui/material';
//import { useNavigate, useLocation } from 'react-router-dom';

// Custom components
import Scheduler from '../components/Scheduler';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';

// the actions
import { getCourses } from '../actions/courses';

// This allows dispatching an action
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);

  const [shouldShowScheduler, setShouldShowScheduler] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    console.log('dispatch(getCourses)) was called at HomePage');
  }, [dispatch]);

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs sx={{ height: '100%', padding: '16px', overflow: 'auto' }}>
        <Button onClick={() => setShouldShowScheduler(!shouldShowScheduler)}>
          {shouldShowScheduler ? 'Hide' : 'Show'} scheduler
        </Button>
        <Grow in>
          <Grid container justifyContent='space-between' alignItems='stretch'>
            <Grid item xs={12}>
              <CourseCardGrid setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Grow>
      </Grid>
      {shouldShowScheduler && (
        <Grid item xs={4} sx={{ padding: '24px' }}>
          <Scheduler {...schedulerContentPlaceholder} />
        </Grid>
      )}
    </Grid>
  );
};

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

export default HomePage;
