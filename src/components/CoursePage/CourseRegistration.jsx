import { Box } from '@mui/material';
import React, { useContext } from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';
import { CourseContext } from '../../pages/CoursePage';

export default function CourseRegistration() {
  const { course } = useContext(CourseContext);
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
