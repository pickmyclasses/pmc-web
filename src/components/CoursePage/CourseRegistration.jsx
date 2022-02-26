import { Box } from '@mui/material';
import React from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';

export default function CourseRegistration({ course, classes }) {
  return (
    <Box>
      <ContainerWithStaticScheduler>
        <CourseEnrollmentSubCard course={course} />
        {/* TODO (QC): Inconsistent component/file naming. Also it may be better to let
         *  the table fetch the list fo classes by itself. */}
        <EnhancedTable classes={classes} />
      </ContainerWithStaticScheduler>
    </Box>
  );
}
