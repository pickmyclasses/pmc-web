import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchScheduledClassesAndCustomEvents, fetchRequirements } from '../../api';
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

  const refreshSchedulerData = useCallback(
    (onComplete) => {
      if (user) {
        Promise.all([
          fetchScheduledClassesAndCustomEvents(user.userID).then(
            ({ scheduledClasses, customEvents }) => {
              setClassesInShoppingCart(scheduledClasses);
              setCustomEvents(customEvents);
            }
          ),
          fetchRequirements().then(setRequirements),
        ]).then(() => onComplete?.());
      } else {
        setClassesInShoppingCart([]);
        setCustomEvents([]);
        setRequirements([]);
        onComplete?.();
      }
    },
    [user]
  );

  useEffect(refreshSchedulerData, [refreshSchedulerData]);

  return (
    <SchedulerContext.Provider
      value={{ classesInShoppingCart, customEvents, requirements, refreshSchedulerData }}
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
 *   refreshSchedulerData: function(function(): *): void,
 * }>}
 */
export const SchedulerContext = createContext(null);
