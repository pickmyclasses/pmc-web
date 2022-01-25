import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

// Fetch the data from the global Redux Store
import { useSelector } from 'react-redux';

import CourseCard from './CourseCard/CourseCard';

// TODO: replace numColumns implementation with fixed-size cards (ex: fixed 120px rather than
//     divided into 4 columns)
const CourseCardGrid = ({ numColumns = 3, setCurrentId }) => {
  // the state.courses is from combineReducers({ courses: courses })
  const courses = useSelector((state) => state.courses);

  return !courses.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems='stretch' spacing={2}>
      {courses.map((course, i) => (
        <Grid key={i} item xs={12} sm={12 / numColumns}>
          <CourseCard course={course} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCardGrid;
