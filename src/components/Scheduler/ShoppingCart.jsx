import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { fetchClassByID, fetchClassesInShoppingCart, fetchCourseByID } from '../../api';
import Timeline from './Timeline';
import { parseDay, parseTime } from '../../utils';

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
      classes = classes.map(({ data }) => data[0]);

      const courseIDs = [...new Set(classes.map((classData) => classData['course_id']))];
      Promise.all(courseIDs.map((id) => fetchCourseByID(id))).then((courses) => {
        const courseByID = new Map(courses.map(({ data }) => [data['id'], data]));

        const sessions = [];
        for (let classData of classes) {
          for (let dayOffered of classData['offer_date']) {
            const course = courseByID.get(classData['course_id']);
            const courseCode = `${course['department']} ${course['number']}`;
            const relatedClasses = classes.filter(
              (classData) => classData['course_id'] === course['id']
            );

            sessions.push({
              columnIndex: parseDay(dayOffered) - 1,
              start: parseTime(classData['start_time']),
              end: parseTime(classData['end_time']),
              text: courseCode,
              data: {
                id: course['id'],
                earliestStart: Math.min(
                  ...relatedClasses.map((classData) => parseTime(classData['start_time']))
                ),
                title: courseCode,
                subtitle: course['name'],
                descriptions: relatedClasses.map(
                  (classData) =>
                    `${classData['offer_date'].join(', ')}` +
                    ` @ ${classData['start_time']} - ${classData['end_time']}`
                ),
                detailPageLink: `/courseDetails/${course['id']}`,
              },
            });
          }
        }
        onFetched(sessions);
      });
    });
  });
};
