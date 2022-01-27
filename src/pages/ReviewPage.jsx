import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

import { Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
//Project Imports

import ReviewDescription from '../components/ReviewInputDetails/ReviewDescription';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewPros from '../components/ReviewInputDetails/ReviewPros';
import ReviewCons from '../components/ReviewInputDetails/ReviewCons';
import { URL } from '../constants/constants';
import CourseContext from '../components/CourseDetails/CourseContext';
import MainCard from '../components/Skeleton/MainCard';
import axios from 'axios';
import PageWithScheduler from '../pages/PageWithScheduler';
import { gridSpacing } from '../constants/constants';
export default function ReviewPage({ shouldShowScheduler }) {
  let courseID = CourseContext.courseID;
  const [course, setCourse] = useState([]);
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(`${URL}/course/${courseID}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
              <ReviewDescription course={course} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewRatings course={course} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewPros course={course} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReviewCons course={course} />
            </Grid>
          </Grid>
        </MainCard>
      </Container>
      ;
    </PageWithScheduler>
  );
}
