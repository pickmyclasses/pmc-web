import React from 'react';
import { Stack } from '@mui/material';
import CourseResultItem from './CourseResultItem';

export default function CourseResultList({ courses = [] }) {
  return (
    <Stack spacing='24px'>
      {courses.map((course, i) => (
        <CourseResultItem key={i} course={course} />
      ))}
    </Stack>
  );
}
