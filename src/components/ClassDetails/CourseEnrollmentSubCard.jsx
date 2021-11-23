import React from 'react';
import { Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import TagBox from '../Utilities/TagBox';

//Project Imports
import SubCard from '../Skeleton/SubCard';

//TODO 1: loop through the course dynamically to check the enrollment requirement
//TODO 2: Assign different colors to the tag e.g red to show the user hasn't completed the class, blue vice-versa
const gridSpacing = 3;

export default function CourseDescriptionSubCard({ CourseData }) {
  return (
    <SubCard title='Enrollment Requirement'>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TagBox bgcolor='error.main' title={CourseData.math} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          {/* <TagBox bgcolor='Physics 1210' title='success.main' /> */}
          <TagBox bgcolor='primary.light' title={CourseData.physics} />
        </Grid>
      </Grid>
    </SubCard>
  );
}
