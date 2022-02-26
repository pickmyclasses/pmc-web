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

  const refreshSchedulerData = useCallback(
    () => fetchSchedulerData(user, setClassesInShoppingCart, setRequirements),
    [user]
  );

  useEffect(() => refreshSchedulerData(), [refreshSchedulerData]);

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

/**
 * Fetches the content data to display in the scheduler, including
 *   - The classes and corresponding courses the `user` has in their shopping cart (outputs via
 *     the `onFetchedClassesInShoppingCart` callback), and
 *   - The graduation requirements and progress toward graduation for the `user` (outputs via
 *     the `onFetchedRequirements` callback).
 *
 * Outputs are empty (but not null) if `user` is null.
 */
const fetchSchedulerData = (user, setClassesInShoppingCart, setRequirements) => {
  if (user) {
    fetchClassesInShoppingCart(user.userID).then((data) =>
      setClassesInShoppingCart(
        data.data.data.scheduled_class_list.map((x) => ({
          classData: x.class_data,
          course: x.course_data,
        }))
      )
    );
    fetchRequirements().then(setRequirements);
  } else {
    // Not logged in
    setClassesInShoppingCart([]);
    setRequirements([]);
  }
};
