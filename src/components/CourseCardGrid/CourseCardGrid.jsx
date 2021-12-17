import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

// Fetch the data from the global Redux Store
import { useSelector } from 'react-redux';

import CourseCard from './CourseCard/CourseCard';

const CourseCardGrid = ({ setCurrentId }) => {
  // the state.courses is from combineReducers({ courses: courses })
  const courses = useSelector((state) => state.courses);

  return !courses.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems='stretch' spacing={2}>
      {courses.map((course, i) => (
        <Grid key={i} item xs={12} sm={4}>
          <CourseCard course={course} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCardGrid;
