import React from 'react';
import { Box, Grid } from '@mui/material';
import CourseResultItem from './CourseResultItem';

export default function CourseResultList({ courses = [] }) {
  return (
    <Box sx={{ '> *': { marginY: '24px' } }}>
      {courses.map((data, i) => (
        <CourseResultItem key={i} data={data} />
      ))}
    </Box>
  );
}
