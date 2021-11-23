import React from 'react';
import { Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import SubCard from '../Skeleton/SubCard';

export default function CourseDescriptionSubCard({ CourseData }) {
  return (
    <SubCard title='Course Description'>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <MuiTypography variant='subtitle1' gutterBottom>
            {CourseData.description}
          </MuiTypography>
        </Grid>
      </Grid>
    </SubCard>
  );
}
