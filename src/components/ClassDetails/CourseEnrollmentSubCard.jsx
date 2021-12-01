import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import CourseStatus from './CourseStatus';
//Project Imports
import SubCard from '../Skeleton/SubCard';
import Box from '@mui/material/Box';

//TODO 1: loop through the course dynamically to check the enrollment requirement
//TODO 2: Assign different colors to the tag e.g red to show the user hasn't completed the class, blue vice-versa
const gridSpacing = 3;

export default function CourseDescriptionSubCard({ CourseData }) {
  return (
    <SubCard title='Enrollment Requirement'>
      <Grid container direction='column' spacing={gridSpacing}>
        <Grid item>
          <MuiTypography variant='subtitle1' gutterBottom>
            {CourseData.prerequisites}
          </MuiTypography>
        </Grid>
        <Grid item sx={{ width: 1 }}>
          <CourseStatus canRegister={CourseData.canRegister} />
        </Grid>
      </Grid>
    </SubCard>
  );
}
