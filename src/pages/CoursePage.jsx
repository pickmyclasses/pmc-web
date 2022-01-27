// TODO: draw the horizontal bars for student's ratings.

import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
//Project Imports
import CourseDescriptionSubCard from '../components/CourseDetails/CourseDescriptionSubCard';
import CourseEnrollmentSubCard from '../components/CourseDetails/CourseEnrollmentSubCard';
import CourseDetails from '../components/CourseDetails/CourseDetails';
import MainCard from '../components/Skeleton/MainCard';
import CourseOverallRatings from '../components/CourseDetails/CourseOverallRatings';
import CourseReviews from '../components/CourseDetails/CourseReviews';
import axios from 'axios';
//theme constant
import { gridSpacing } from '../constants/constants';
import CourseContext from '../components/CourseDetails/CourseContext';

/*
 * This is the demo data that will be replaced by data fetched from the API calls from the back-end.
 */

export default function CoursePage() {
  let key = 'CS4400';
  let courseParam = useParams();
  const [course, setCourse] = useState([]);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
      .get(`http://localhost:3000/class?id=${courseParam.id}`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(`http://localhost:3000/course/${courseParam.id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  // Record the ID of the course into the context (global variable)
  CourseContext.courseID = course.id;
  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <MainCard title={course.department + ' ' + course.number + ' ' + course.name}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <CourseDescriptionSubCard course={course}></CourseDescriptionSubCard>
          </Grid>

          <Grid item xs={12} sm={12}>
            <CourseEnrollmentSubCard course={course}></CourseEnrollmentSubCard>
          </Grid>

          <Grid item xs={12} sm={12}>
            <CourseDetails classes={classes} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CourseOverallRatings course={course}></CourseOverallRatings>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CourseReviews course={course}></CourseReviews>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CourseReviews course={course}></CourseReviews>
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
}
