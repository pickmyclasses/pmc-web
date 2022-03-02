import { Box, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../../Scheduler/ShoppingCart';

export default function SchedulePreview() {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  return (
    <Box
      height='calc(100vh - 72px - 160px - 64px)'
      position='sticky'
      top='192px'
      left='calc(50% + 16px)'
      width='calc(50% - 16px)'
      zIndex={998}
    >
      <ShoppingCart
        classes={classesInShoppingCart}
        noSummary
        timelineColumnTitles={timelineColumnTitles}
      />
    </Box>
  );
}

const timelineColumnTitles = 'Monday Tuesday Wednesday Thursday Friday'.split(' ');
