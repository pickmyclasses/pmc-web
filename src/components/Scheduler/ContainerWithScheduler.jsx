import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  fetchScheduledClassesAndCustomEvents,
  fetchRequirements,
  fetchHistoryCourses,
} from '../../api';
import { UserContext } from '../../App';

/**
 * Provides fetching, storing and refreshing of the scheduler's data, including the list of
 * classes the user has in their scheduler and the data for their progress toward graduation.
 * This component automatically fetches and stores scheduler data every time the user changes
 * or logs out.
 */
export default function ContainerWithScheduler({ children }) {
  const { user } = useContext(UserContext);

  const [classesInShoppingCart, setClassesInShoppingCart] = useState([]);
  const [customEvents, setCustomEvents] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [historyCourses, setHistoryCourses] = useState([]);

  const refreshSchedulerData = useCallback(
    (onComplete) => {
      if (user) {
        Promise.all([
          fetchScheduledClassesAndCustomEvents(user.userID),
          fetchRequirements(user),
          fetchHistoryCourses(user.userID),
        ]).then(([{ scheduledClasses, customEvents }, requirements, historyCourses]) => {
          setClassesInShoppingCart(scheduledClasses);
          setCustomEvents(customEvents);
          setRequirements(requirements);
          setHistoryCourses(historyCourses);
          onComplete?.();
        });
      } else {
        setClassesInShoppingCart([]);
        setCustomEvents([]);
        setRequirements([]);
        setHistoryCourses([]);
        onComplete?.();
      }
    },
    [user]
  );

  useEffect(refreshSchedulerData, [refreshSchedulerData]);

  return (
    <SchedulerContext.Provider
      value={{
        classesInShoppingCart,
        customEvents,
        requirements,
        refreshSchedulerData,
        historyCourses,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

/**
 * @type {React.Context<{
 *   classesInShoppingCart: Array<{classData, course}>,
 *   requirements: Array<Object>,
 *   customEvents: Array<Object>,
 *   historyCourses: Array<Object>,
 *   refreshSchedulerData: (onComplete: () => void = null) => void,
 * }>}
 */
export const SchedulerContext = createContext();
