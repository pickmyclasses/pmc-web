import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import CourseStatus from './CourseStatus';
import SubCard from '../Skeleton/SubCard';
import CourseChip from '../../components/CourseDetails/CourseChip';

//TODO 1: loop through the course dynamically to check the enrollment requirement
//TODO 2: Assign different colors to the tag e.g red to show the user hasn't completed the class, blue vice-versa
const gridSpacing = 3;

export default function CourseEnrollmentSubCard({ course }) {
  return (
    <SubCard title='Enrollment Information'>
      <Grid container direction='column' spacing={gridSpacing}>
        <Grid item>
          <Typography gutterBottom variant='h6' component='div'>
            Credit hour:
            {/* TODO (QC): Some courses have varying credit hours (e.g. 1-3 credits). */}
            <CourseChip value={course['MaxCredit']} />
          </Typography>
          <Divider variant='middle' />

          <Typography gutterBottom variant='h6' component='div'>
            Prerequisites:
          </Typography>
          {course['Prerequisites']}
        </Grid>
        <Grid item sx={{ width: 1 }}>
          <CourseStatus canRegister={1} />
        </Grid>
      </Grid>
    </SubCard>
  );
}
