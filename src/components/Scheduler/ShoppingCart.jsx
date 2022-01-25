import React, { useRef } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import DayTimeline from './Timeline';

/** The list of days to display (string) or hide (null). */
const days = [null, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', null];

/**
 * Generates a list of events for each day from a list of courses.
 *
 * Example: given list of courses [ (course A meets Mon, Wed), (course B meets Tue, Wed) ],
 * this function returns:
 * [
 *   [course A],           // Mon
 *   [course B],           // Tue
 *   [course A, course B], // Wed
 *   [],                   // Thu
 *   [],                   // Fri
 * ]
 */
const getEventsByDay = (courses) => {
  const eventsByDay = days.map(() => []);
  for (let course of courses) {
    for (let session of course.sessions) {
      for (let day of session.days)
        eventsByDay[day].push({
          text: course.name,
          start: session.start,
          end: session.end,
        });
    }
  }
  return eventsByDay;
};

const setTimeBlockStyles = (containerRef, setStyle) => {
  for (let timeBlock of containerRef.current.querySelectorAll('button')) {
    setStyle(timeBlock.style, timeBlock.getAttribute('text'));
  }
};

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
export default function ShoppingCart({ scheduledCourses = [] }) {
  const theme = useTheme();

  const containerRef = useRef();

  const eventsByDay = getEventsByDay(scheduledCourses);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>Shopping Cart</div>
      <Grid ref={containerRef} container sx={{ width: '100%', flex: 1 }}>
        {days.map(
          (day, i) =>
            day && ( // show timelines only for non-null days
              <Grid key={day} item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                  {day}
                </div>
                <Box
                  sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <DayTimeline
                    events={eventsByDay[i]}
                    onTimeBlockClick={(targetText) =>
                      setTimeBlockStyles(
                        containerRef,
                        (style, text) => (style['opacity'] = text === targetText ? 1 : 0.333)
                      )
                    }
                  />
                </Box>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}
