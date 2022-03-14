import { Box } from '@mui/material';
import { mergeShoppingCartClasses } from 'components/Scheduler/Scheduler';
import React, { useContext, useEffect, useState } from 'react';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../../Scheduler/ShoppingCart';

export default function SchedulePreview({ classesToHighlight, onSelect }) {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const [classes, setClasses] = useState([]);

  useEffect(
    () => setClasses(mergeShoppingCartClasses(classesInShoppingCart, classesToHighlight, true)),
    [classesInShoppingCart, classesToHighlight]
  );

  return (
    <Box height='calc(100% - 32px)'>
      <ShoppingCart
        classes={classes}
        noSummary
        timelineColumnTitles={timelineColumnTitles}
        onSelect={onSelect}
        alwaysGrayUnHighlighted
      />
    </Box>
  );
}

const timelineColumnTitles = 'Monday Tuesday Wednesday Thursday Friday'.split(' ');
