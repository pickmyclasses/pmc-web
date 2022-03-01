import { Box, Grid } from '@mui/material';
import React, { useContext } from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';
import { CourseContext } from '../../pages/CoursePage';
import Scheduler from '../Scheduler/Scheduler';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../Scheduler/ShoppingCart';

export default function CourseRegistration() {
  const { course } = useContext(CourseContext);

  const { classesInShoppingCart } = useContext(SchedulerContext);

  return (
    <Box>
      <Grid container spacing='32px'>
        <Grid item xs={6} height='calc(100vh - 160px - 72px - 32px)'>
          <ShoppingCart classes={classesInShoppingCart} noSummary />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <ContainerWithStaticScheduler>
        <CourseEnrollmentSubCard course={course} />
        {/* TODO (QC): Inconsistent component/file naming. */}
        <EnhancedTable classes={course.classes} />
      </ContainerWithStaticScheduler>
    </Box>
  );
}
