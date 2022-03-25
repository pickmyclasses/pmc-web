import { Box } from '@mui/material';
import SchedulePreview from 'components/CoursePage/CourseRegistration/SchedulePreview';
import React from 'react';

/** Renders the schedule tab of the user profile page. */
export default function ProfileSchedule() {
  return (
    <Box height='1440px'>
      <SchedulePreview
        timelineColumnTitles={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
      />
    </Box>
  );
}
