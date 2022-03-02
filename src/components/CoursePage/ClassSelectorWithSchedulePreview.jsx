import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../Scheduler/ShoppingCart';

export default function ClassSelectorWithSchedulePreview() {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  return (
    <Grid container spacing='32px' position='sticky' top={160}>
      <Grid item xs={6}>
        {Array(323).fill('2').join(' ')}
      </Grid>
      <Grid item xs={6} height='calc(100vh - 160px - 72px - 32px)' paddingLeft='16px'>
        <ShoppingCart
          classes={classesInShoppingCart}
          noSummary
          timelineColumnTitles={timelineColumnTitles}
        />
      </Grid>
    </Grid>
  );
}

const timelineColumnTitles = 'Monday Tuesday Wednesday Thursday Friday'.split(' ');
