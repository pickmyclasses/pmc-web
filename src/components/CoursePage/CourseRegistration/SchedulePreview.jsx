import { Box, Card, Stack, Typography } from '@mui/material';
import { mergeShoppingCartClasses } from 'components/Scheduler/Scheduler';
import React, { useContext, useEffect, useState } from 'react';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../../Scheduler/ShoppingCart';

export default function SchedulePreview({ course, classesToHighlight, ...shoppingCartProps }) {
  const { classesInShoppingCart, customEvents } = useContext(SchedulerContext);

  const [classes, setClasses] = useState([]);

  useEffect(
    () =>
      setClasses(
        mergeShoppingCartClasses(
          classesInShoppingCart.filter((x) => +x.course.id !== +course?.id),
          classesToHighlight,
          true
        )
      ),
    [course, classesInShoppingCart, classesToHighlight]
  );

  return (
    <Box height='calc(100% - 32px)' paddingTop='8px'>
      <Card sx={{ height: 'calc(100% - 48px)', padding: '24px', overflow: 'visible' }}>
        <Stack spacing='12px' height='100%'>
          <Typography variant='subtitle2'>Schedule Preview</Typography>
          <Box flex={1}>
            <ShoppingCart
              classes={classes}
              customEvents={customEvents}
              noSummary
              alwaysGrayUnHighlighted
              {...shoppingCartProps}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
