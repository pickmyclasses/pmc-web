import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { EventNote } from '@mui/icons-material';
import ShoppingCart from './ShoppingCart';
import RequirementList from './RequirementList';
import { SchedulerContext } from './ContainerWithScheduler';

/**
 * A component that displays the current user's schedule on the top and progress toward
 * graduation (PTG) on the bottom. Optionally provide a list of `classesToHighlight` to
 * temporarily highlight corresponding time blocks or progress in the scheduler or PTG.
 * @param {{classesToHighlight: ?Array<{classData, course}>}} props
 */
export default function Scheduler({ classesToHighlight = null }) {
  const { classesInShoppingCart, requirements } = useContext(SchedulerContext);

  const [classes, setClasses] = useState([]);

  // Combine classes in shopping cart with classes to highlight, only keeping the copy to
  // highlight if there are repeats.
  useEffect(() => {
    const toHighlight = classesToHighlight || [];
    setClasses([
      ...classesInShoppingCart.filter(({ classData }) =>
        toHighlight.every((y) => y.classData.ID !== classData.ID)
      ),
      ...toHighlight,
    ]);
  }, [classesInShoppingCart, classesToHighlight]);

  const renderLoadingIndication = () => <CircularProgress sx={{ margin: 'auto' }} />;

  const renderSchedulerContent = () => (
    <>
      <Box flex={1}>
        <ShoppingCart classes={classes} />
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
      <RequirementList requirements={requirements || []} />
    </>
  );

  return (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box display='flex' alignItems='center' marginBottom='16px'>
        <EventNote color='action' fontSize='small' />
        <Typography variant='overline' marginLeft='8px'>
          Schedule
        </Typography>
      </Box>
      {classes == null ? renderLoadingIndication() : renderSchedulerContent()}
    </Box>
  );
}
