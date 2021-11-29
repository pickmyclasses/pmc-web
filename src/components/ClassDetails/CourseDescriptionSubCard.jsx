import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import SubCard from '../Skeleton/SubCard';
const gridSpacing = 3;
export default function CourseDescriptionSubCard({ CourseData }) {
  return (
    <SubCard title='Course Description' spacing={gridSpacing}>
      <Grid container>
        <MuiTypography variant='subtitle1' gutterBottom>
          {CourseData.description}
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
