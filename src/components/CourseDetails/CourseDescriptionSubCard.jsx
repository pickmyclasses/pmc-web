import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';

export default function CourseDescriptionSubCard({ course }) {
  return (
    <SubCard title='Course Description' spacing={gridSpacing}>
      <Grid container>
        <MuiTypography variant='subtitle1' gutterBottom>
          {course['description']}
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
