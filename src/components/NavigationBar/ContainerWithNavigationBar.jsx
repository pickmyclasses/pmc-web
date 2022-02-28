import React, { createContext, useContext, useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';
import ContainerWithScheduler from '../Scheduler/ContainerWithScheduler';
import { UserContext } from '../../App';

/**
 * Renders a container with a navigation bar on the top. Also provides contexts that permit
 * buttons in the navigation bar interact with the rest of our app.
 */
export default function ContainerWithNavigationBar({ children }) {
  const { user } = useContext(UserContext);

  const [hasStaticScheduler, setHasStaticScheduler] = useState(false);
  const [shouldShowStaticScheduler, setShouldShowStaticScheduler] = useState(user != null);

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
