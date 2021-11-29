import React from 'react';
import { Grid } from '@mui/material';
import TagBox from '../Utilities/TagBox';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import SubCard from '../Skeleton/SubCard';

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
      </Grid>
    </SubCard>
  );
}
