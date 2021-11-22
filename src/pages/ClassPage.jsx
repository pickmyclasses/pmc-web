import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import SubCard from '../components/Skeleton/SubCard';
import MainCard from '../components/Skeleton/MainCard';
import TagBox from '../components/Utilities/TagBox';
//theme constant
const gridSpacing = 3;

const ClassPage = () => (
  <MainCard title='CS 1400 - Introduction to Computer Programming'>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <SubCard title='Course Description'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <MuiTypography variant='subtitle1' gutterBottom>
                This course is an introduction to the engineering and mathematical skills
                required to effectively program computers and is designed from students with no
                prior programming experience.
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>

        <SubCard title='Enrollment Requirement'>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <TagBox bgcolor='error.main' title='AP CALC BC' />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              {/* <TagBox bgcolor='Physics 1210' title='success.main' /> */}
              <TagBox bgcolor='primary.light' title='Physics 1210' />
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default ClassPage;
