import React from 'react';
import { Grid, Box } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import CourseChart from './CourseBarChart';

//Project Imports
import SubCard from '../Skeleton/SubCard';

function convert_weekdays(meet_date) {
  let weekday = null;
  switch (meet_date) {
    case '1':
      weekday = 'Monday';
      break;
    case '2':
      weekday = 'Tuesday';
      break;
    case '3':
      weekday = 'Wednesday';
      break;
    case '4':
      weekday = 'Thursday';
      break;
    case '5':
      weekday = 'Friday';
      break;
    case '6':
      weekday = 'Saturday';
      break;
    case '7':
      weekday = 'Sunday';
      break;
    default:
      weekday = 'Invalid';
      break;
  }
  return weekday;
}

export default function CourseDetails({ course }) {
  const meet_dates = course.date;
  return (
    <SubCard title=''>
      <Grid item>
        <MuiTypography variant='body1' gutterBottom>
          Units: {course.credit_hour}
        </MuiTypography>
        <MuiTypography variant='body1' gutterBottom>
          Location: {course.location}
        </MuiTypography>
        <MuiTypography variant='body1' gutterBottom>
          Course Meet Time:{' '}
          {meet_dates?.map((day) => (
            <li>
              {convert_weekdays(day)} {course.clock_start_time} - {course.clock_end_time}
            </li>
          ))}
          {/* Course Meet Time: {meet_dates} */}
        </MuiTypography>
      </Grid>

      <Grid item>
        <MuiTypography variant='body1' gutterBottom>
          Course Components: Laboratory & Lecture
        </MuiTypography>
      </Grid>
      <Grid item lg={15}>
        <CourseChart />
      </Grid>
    </SubCard>
  );
}
