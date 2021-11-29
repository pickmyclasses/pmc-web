import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import CourseChart from './CourseBarChart';

//Project Imports
import SubCard from '../Skeleton/SubCard';

export default function CourseOverallRatings({ CourseData }) {
  return (
    <SubCard title=''>
      <Grid item>
        <MuiTypography variant='h5' gutterBottom>
          Units: 3.0
        </MuiTypography>
      </Grid>

      <Grid item>
        <MuiTypography variant='h5' gutterBottom>
          Course Components: Laboratory & Lecture
        </MuiTypography>
      </Grid>
      <Grid item lg={15}>
        <CourseChart />
      </Grid>
    </SubCard>
  );
}
