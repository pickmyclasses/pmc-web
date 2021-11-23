import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

//Project Imports
import CourseDescriptionSubCard from '../components/ClassDetails/CourseDescriptionSubCard';
import CourseEnrollmentSubCard from '../components/ClassDetails/CourseEnrollmentSubCard';
import SubCard from '../components/Skeleton/SubCard';
import MainCard from '../components/Skeleton/MainCard';
//theme constant
const gridSpacing = 3;

/*
 * This is the demo data that will be replaced by data fetched from the API calls from the back-end.
 */
const CourseData = {
  description:
    'This course is an introduction to the engineering and mathematical skills required to' +
    'effectively program computers and is designed for students with no prior programming experience.',
  math: 'Math 1210',
  physics: 'Physics 1210',
};
const CoursePage = () => (
  <MainCard title='CS 1400 - Introduction to Computer Programming'>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CourseDescriptionSubCard CourseData={CourseData}></CourseDescriptionSubCard>
        <CourseEnrollmentSubCard CourseData={CourseData}></CourseEnrollmentSubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default CoursePage;
