import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  fetchScheduledClassesAndCustomEvents,
  fetchRequirements,
  fetchHistoryCourses,
  fetchBookmarkedCourses,
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
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

  const refreshSchedulerData = useCallback(
    (onComplete) => {
      if (user) {
        Promise.all([
          fetchScheduledClassesAndCustomEvents(user.userID),
          fetchRequirements(user),
          fetchHistoryCourses(user.userID),
          fetchBookmarkedCourses(user.userID),
        ]).then(
          ([
            { scheduledClasses, customEvents },
            requirements,
            historyCourses,
            bookmarkedCourses,
          ]) => {
            setClassesInShoppingCart(scheduledClasses);
            setCustomEvents(customEvents);
            setRequirements(requirements);
            setHistoryCourses(historyCourses);
            setBookmarkedCourses(bookmarkedCourses);
            onComplete?.();
          }
        );
      } else {
        setClassesInShoppingCart([]);
        setCustomEvents([]);
        setRequirements([]);
        setHistoryCourses([]);
        setBookmarkedCourses([]);
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
        bookmarkedCourses,
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
 *   bookmarkedCourses: Array<Object>,
 *   refreshSchedulerData: (onComplete: () => void = null) => void,
 * }>}
 */
export const SchedulerContext = createContext();
