import { Box, Grid } from '@mui/material';
import React, { useContext } from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';
import { CourseContext } from '../../pages/CoursePage';
import Scheduler from '../Scheduler/Scheduler';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../Scheduler/ShoppingCart';
import ClassSelectorWithSchedulePreview from './ClassSelectorWithSchedulePreview';

export default function CourseRegistration() {
  const { course } = useContext(CourseContext);

  return (
    <Box>
      <Grid container spacing='32px'>
        <Grid item xs={6}>
          {Array(2323).fill('1').join(' ')}
        </Grid>
      </Grid>
      <ClassSelectorWithSchedulePreview />
      <Grid container spacing='32px'>
        <Grid item xs={6}>
          {Array(2323).fill('3').join(' ')}
        </Grid>
      </Grid>
    </Box>
  );
}
