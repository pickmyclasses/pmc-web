import { Box } from '@mui/material';
import React, { useContext } from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';
import { CourseContext } from '../../pages/CoursePage';

export default function CourseRegistration() {
  const { course, classes } = useContext(CourseContext);
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
