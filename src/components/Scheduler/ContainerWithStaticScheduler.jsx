import React, { createContext, useContext, useState } from 'react';
import { Box, Card, Container, Grid } from '@mui/material';
import { useMount } from '../../utils';
import Scheduler from './Scheduler';
import { NavigationBarContext } from '../NavigationBar/ContainerWithNavigationBar';

/**
 * A component that displays a static scheduler whose visibility is toggle-able via the
 * "Schedule" button in the navigation bar.
 */
export default function ContainerWithStaticScheduler({ children }) {
  const { setHasStaticScheduler, shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [classesToHighlight, setClassesToHighlight] = useState(null);

  // While this page is active, disable showing the scheduler as a drop-down.
  useMount(() => {
    setHasStaticScheduler(true);
    return () => setHasStaticScheduler(false);
  });

  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs sx={{ height: '100%', overflow: 'auto' }}>
          <SetClassesToHighlightContext.Provider value={setClassesToHighlight}>
            {children}
          </SetClassesToHighlightContext.Provider>
        </Grid>
        <Grid
          item
          // TODO Q: Ideally we should show a message in the scheduler if not logged in, e.g.
          // "Log in to enable your personal shopping cart!"
          // ...instead of hiding the scheduler altogether.
          xs={shouldShowStaticScheduler ? 3.25 : 0}
          sx={{ padding: '24px', display: shouldShowStaticScheduler ? '' : 'none' }}
        >
          <Card sx={{ height: '100%', overflow: 'visible' }}>
            <Box padding='20px' height='calc(100% - 40px)'>
              <Scheduler classesToHighlight={classesToHighlight} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

/**
 * @type {function(Array<{classData, course, highlight}>): void} Renews the list of
 *     classes (and their corresponding courses) to highlight in the scheduler.
 */
export const SetClassesToHighlightContext = createContext(null);
