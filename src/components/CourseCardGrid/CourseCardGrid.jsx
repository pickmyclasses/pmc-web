import React from 'react';
import { Box, Grid } from '@mui/material';
import CourseCard from './CourseCard/CourseCard';

export default function CourseCardGrid({ numColumns = 3, courses = [] }) {
  return (
    <Box sx={{ padding: '4px' }}>
      <Grid container justifyContent='space-between' alignItems='stretch'>
        <Grid item xs={12}>
          <Grid container alignItems='stretch' spacing='32px' columns={numColumns}>
            {courses.map((data, i) => (
              <Grid key={i} item sm={1}>
                <CourseCard data={data} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
