import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { fetchClassByID, fetchClassesInShoppingCart, fetchCourseByID } from '../../api';
import Timeline from './Timeline';
import { formatCourseName, parseDayList, parseTime } from '../../utils';

/**
 * The shopping cart resides in the top part of the scheduler.
 *
 * @param {{
 *   scheduledCourses: {
 *     name: string,
 *     title: string,
 *     sessions: {
 *       component: string,
 *       days: number[],
 *       start: number,
 *       end: number,
 *     }[],
 *   }[],
 * }} props
 */
export default function ShoppingCart() {
  const [sessions, setSessions] = useState(null);

  useEffect(() => fetchSessions(setSessions), []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '24px' }}>Shopping Cart</div>
      <Timeline events={sessions} />
    </Box>
  );
}

/**
 * Fetches the data for shopping cart and generate a list of sessions for each weekday.
 * @param {function(Array): void} onFetched The callback for when fetching is done.
 */
const fetchSessions = (onFetched) => {
  fetchClassesInShoppingCart().then(({ data: classIDs }) => {
    Promise.all(classIDs.map((id) => fetchClassByID(id))).then((classes) => {
      classes = classes.map((data) => data['data']['data']);

      const courseIDs = [...new Set(classes.map((classData) => classData['CourseID']))];
      Promise.all(courseIDs.map((id) => fetchCourseByID(id))).then((courses) => {
        const courseByID = new Map(
          courses.map(
            ({
              data: {
                data: { course },
              },
            }) => [course['ID'], course]
          )
        );

        const sessions = [];
        for (let classData of classes) {
          for (let dayOffered of parseDayList(classData['OfferDate'])) {
            const course = courseByID.get(classData['CourseID']);
            const courseCode = formatCourseName(course['CatalogCourseName']);
            const relatedClasses = classes.filter(
              (classData) => classData['CourseID'] === course['ID']
            );

            sessions.push({
              columnIndex: dayOffered - 1,
              start: parseTime(classData['StartTime']),
              end: parseTime(classData['EndTime']),
              text: courseCode,
              data: {
                id: course['ID'],
                earliestStart: Math.min(
                  ...relatedClasses.map((classData) => parseTime(classData['StartTime']))
                ),
                title: courseCode,
                subtitle: course['Title'],
                descriptions: relatedClasses.map(
                  (classData) =>
                    `${classData['OfferDate']}` +
                    ` ${classData['StartTime']}–${classData['EndTime']}`
                ),
                detailPageLink: `/course/${course['ID']}`,
              },
            });
          }
        }
        onFetched(sessions);
      });
    });
  });
};
