import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { fetchClassByID, fetchClassIDsInShoppingCart, fetchCourseByID } from '../api';
import Scheduler from '../components/Scheduler/Scheduler';
import { UserContext } from '../App';

/**
 * @type {React.Context<{
 *   setClassesToHighlight: function(Array<{classData: Object, course: Object}>): void,
 *   refetchSchedulerData: function(): void,
 * }>}
 */
export const SchedulerDisplayContentContext = createContext();

/** A page that displays a static, toggle-able scheduler on the right. */
export default function PageWithScheduler({ children, shouldShowScheduler }) {
  const [isLoading, setIsLoading] = useState(true);
  const [classesInShoppingCart, setClassesInShoppingCart] = useState([]);
  const [classesToHighlight, setClassesToHighlight] = useState([]);

  const user = useContext(UserContext);

  const fetchSchedulerData = useCallback(() => {
    setIsLoading(true);
    if (user) {
      fetchClassIDsInShoppingCart(user['ID']).then(({ data }) =>
        fetchClassesAndCourses(data, (classes) => {
          setIsLoading(false);
          setClassesInShoppingCart(classes);
        })
      );
    }
  }, [user]);

  useEffect(() => fetchSchedulerData(), [fetchSchedulerData]);

  const allClasses = [
    ...classesInShoppingCart
      .filter(({ classData }) =>
        classesToHighlight.every((y) => y.classData.ID !== classData.ID)
      )
      .map((x) => ({ ...x, isHighlighted: false })),
    ...classesToHighlight.map((x) => ({ ...x, isHighlighted: true })),
  ];

  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs sx={{ height: '100%', overflow: 'auto' }}>
          <SchedulerDisplayContentContext.Provider
            value={{ setClassesToHighlight, refetchSchedulerData: fetchSchedulerData }}
          >
            {children}
          </SchedulerDisplayContentContext.Provider>
        </Grid>
        <Grid
          item
          xs={shouldShowScheduler ? 3.75 : 0}
          sx={{ padding: '24px', display: shouldShowScheduler ? '' : 'none' }}
        >
          <Scheduler
            isLoading={isLoading}
            classesInShoppingCart={allClasses}
            requirements={placeholderRequirements}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

/** Fetches data for classes and outputs a list of objects like `{classData, course}`. */
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

const placeholderRequirements = [
  { title: 'Major Requirements', progress: 3, total: 6 },
  { title: 'Major Electives', progress: 4, total: 7 },
  { title: 'Math/Science Electives', progress: 2, total: 5 },
  { title: 'General Education', progress: 6, total: 13 },
];
