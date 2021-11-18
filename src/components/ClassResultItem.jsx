import { Box, Skeleton } from '@mui/material';
import React from 'react';

/** A class search result item. */
export default function ClassResultItem() {
  return (
    <Box sx={{ margin: '24px 0' }}>
      <Skeleton animation='wave' sx={{ typography: 'h4' }} />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
    </Box>
  );
}
