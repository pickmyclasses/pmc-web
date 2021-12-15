import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import CourseStatus from './CourseStatus';
//Project Imports
import SubCard from '../Skeleton/SubCard';

//TODO 1: loop through the course dynamically to check the enrollment requirement
//TODO 2: Assign different colors to the tag e.g red to show the user hasn't completed the class, blue vice-versa
const gridSpacing = 3;

export default function CourseEnrollmentSubCard({ course }) {
  return (
    <SubCard title='Enrollment Information'>
      <Grid container direction='column' spacing={gridSpacing}>
        <Grid item>
          <MuiTypography variant='subtitle1' gutterBottom>
            Prerequesite: {course.prerequesite} Credit hour: {course.credit_hour} Associated
            courses: {course.associated_course} Professor: {course.professor} Semester:{' '}
            {course.semester}
          </MuiTypography>
        </Grid>
        <Grid item sx={{ width: 1 }}>
          <CourseStatus canRegister={1} />
        </Grid>
      </Grid>
    </SubCard>
  );
}
