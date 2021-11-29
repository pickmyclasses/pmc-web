// TODO: draw the horizontal bars for student's ratings.

import React from 'react';
import { Grid } from '@mui/material';

//Project Imports
import CourseDescriptionSubCard from '../components/ClassDetails/CourseDescriptionSubCard';
import CourseEnrollmentSubCard from '../components/ClassDetails/CourseEnrollmentSubCard';
import SubCard from '../components/Skeleton/SubCard';
import CourseDetails from '../components/ClassDetails/CourseDetails';
import MainCard from '../components/Skeleton/MainCard';
import CourseOverallRatings from '../components/ClassDetails/CourseOverallRatings';
//theme constant
const gridSpacing = 3;
const CourseDataDict = [];
/*
 * This is the demo data that will be replaced by data fetched from the API calls from the back-end.
 */

function InitCourseData() {
  const CourseData1 = {
    title: 'CS 4400: Computer Systems',
    description:
      "Introduction to computer systems from a programmer's point of view. Machine level representations of programs," +
      'optimizing program performance, memory hierarchy, linking, exceptional control flow, measuring program performance,' +
      'virtual memory, concurrent programming with threads, network programming.',
    prerequisites:
      'C- or better in CS 3810 AND Full Major Status in Computer Science or Computer Engineering.',
    overall_ratings: [5, 3, 6, 12, 9],
  };

  const CourseData2 = {
    title: 'CS 5530: Database Systems',
    description:
      'Representing information about real world enterprises using important data models including the entity-relationship, ' +
      'relational and object-oriented approaches. Database design criteria, including normalization and integrity constraints.' +
      'Implementation techniques using commercial database management system software. Selected advanced topics such as distributed,' +
      'temporal, active, and multi-media databases. ',
    prerequisites:
      '"C-" or better in CS 3500 AND (Full Major status in Computer Science OR Computer Engineering).',
    overall_ratings: [2, 5, 2, 15, 5],
  };

  CourseDataDict['CS4400'] = CourseData1;
  CourseDataDict['CS5530'] = CourseData2;
}

export default function CoursePage({ key }) {
  key = 'CS5530';
  //const CourseDataDict = [];
  InitCourseData();
  return (
    <MainCard title={CourseDataDict[key].title}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
          <CourseDescriptionSubCard CourseData={CourseDataDict[key]}></CourseDescriptionSubCard>
        </Grid>

        <Grid item xs={12} sm={12}>
          <CourseEnrollmentSubCard CourseData={CourseDataDict[key]}></CourseEnrollmentSubCard>
        </Grid>

        <Grid item xs={6} sm={6}>
          <CourseOverallRatings CourseData={CourseDataDict[key]}></CourseOverallRatings>
        </Grid>
        <Grid item xs={6} sm={6}>
          <CourseDetails CourseData={CourseDataDict[key]}></CourseDetails>
        </Grid>
      </Grid>
    </MainCard>
  );
}
