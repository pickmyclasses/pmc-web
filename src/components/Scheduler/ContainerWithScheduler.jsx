import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  fetchClassByID,
  fetchClassesInShoppingCart,
  fetchCourseByID,
  fetchRequirements,
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
  const [requirements, setRequirements] = useState([]);

  const refreshSchedulerData = useCallback(() => {
    if (user) {
      fetchClassesInShoppingCart(user.userID).then(setClassesInShoppingCart);
      fetchRequirements(user.userID).then(setRequirements);
    } else {
      setClassesInShoppingCart([]);
      setRequirements([]);
    }
  }, [user]);

  useEffect(refreshSchedulerData, [refreshSchedulerData]);

  return (
    <SchedulerContext.Provider
      value={{ classesInShoppingCart, requirements, refreshSchedulerData }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

/**
 * @type {React.Context<{
 *   classesInShoppingCart: Array<{classData, course}>,
 *   requirements: Array<Object>,
 *   refreshSchedulerData: function(): void,
 * }>}
 */
export const SchedulerContext = createContext();
