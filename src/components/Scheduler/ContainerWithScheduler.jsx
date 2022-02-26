import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  fetchClassByID,
  fetchClassesInShoppingCart,
  fetchClassIDsInShoppingCart,
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

// TODO Q: The backend will soon support processing/responding to queries in bulk. We should
// replace the following helper functions with simpler API calls that requests class/course
// data in bulk.

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
    // Logged in
    // fetchClassIDsInShoppingCart(user.userID, /* semester_id: */ 1).then(({ data }) =>
    //   fetchClassesAndCourses(
    //     data.map((x) => x.class_id),
    //     setClassesInShoppingCart
    //   )
    // );

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

/**
 * Fetches data for classes and the courses they belong to. With the callback `onFetched`
 * outputs an array of objects like `{classData, course}`.
 */
const fetchClassesAndCourses = (classIDs, onFetched) => {
  Promise.all(classIDs.map((x) => fetchClassByID(x))).then((resClasses) => {
    const classes = resClasses.map((x) => x.data.data);
    const courseIDs = [...new Set(classes.map((x) => x.CourseID))];
    Promise.all(courseIDs.map((x) => fetchCourseByID(x))).then((resCourses) => {
      const courses = resCourses.map((x) => x.data.data.course);
      onFetched(
        classes.map((classData) => ({
          classData,
          course: courses.find((x) => x.ID === classData.CourseID),
        }))
      );
    });
  });
};
