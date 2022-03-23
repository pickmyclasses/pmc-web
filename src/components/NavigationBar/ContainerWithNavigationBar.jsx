import React, { createContext, useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';
import ContainerWithScheduler from '../Scheduler/ContainerWithScheduler';

/**
 * Renders a container with a navigation bar on the top. Also provides contexts that permit
 * buttons in the navigation bar interact with the rest of our app.
 */
export default function ContainerWithNavigationBar({ children }) {
  const [hasStaticScheduler, setHasStaticScheduler] = useState(false);
  const [shouldShowStaticScheduler, setShouldShowStaticScheduler] = useState(true);

  return (
    <Box height='100vh' display='flex' flexDirection='column'>
      <NavigationBarContext.Provider
        value={{
          hasStaticScheduler,
          setHasStaticScheduler,
          shouldShowStaticScheduler,
          setShouldShowStaticScheduler,
        }}
      >
        <ContainerWithScheduler>
          <NavigationBar />
          {children}
        </ContainerWithScheduler>
      </NavigationBarContext.Provider>
    </Box>
  );
}

/**
 * @type {React.Context<{
 *   hasStaticScheduler: Boolean,
 *   setHasStaticScheduler: function(Boolean): void,
 *   shouldShowStaticScheduler: Boolean,
 *   setShouldShowStaticScheduler: function(Boolean): void,
 * }>}
 */
export const NavigationBarContext = createContext();
