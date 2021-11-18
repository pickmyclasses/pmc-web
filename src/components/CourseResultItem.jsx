import { Box, Skeleton } from '@mui/material';
import React from 'react';

/** A course search result item. */
export default function CourseResultItem() {
  return (
    <Box sx={{ margin: '24px 0' }}>
      <Skeleton animation='wave' sx={{ typography: 'h4' }} />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
    </Box>
  );
}
