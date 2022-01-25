import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import DayTimeline from './Timeline';
import CourseCard from '../CourseCardGrid/CourseCard/CourseCard';

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
      for (let day of session.days) {
        eventsByDay[day].push({
          text: course.name,
          start: session.start,
          end: session.end,
        });
      }
    }
  }
  return eventsByDay;
};

const setTimeBlockStyles = (containerRef, setStyle) => {
  if (containerRef?.current) {
    for (let timeBlock of containerRef.current.querySelectorAll('button')) {
      setStyle(timeBlock.style, timeBlock.getAttribute('text'));
    }
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
  const [selectedCourse, setSelectedCourse] = useState(null);

  const theme = useTheme();

  const containerRef = useRef();
  const selectionDetailCardRef = useRef();

  const eventsByDay = getEventsByDay(scheduledCourses);

  const selectCourse = (targetText, targetCourse) => {
    setSelectedCourse(targetCourse);
    setTimeBlockStyles(
      containerRef,
      (style, text) => (style['opacity'] = !targetText || text === targetText ? 1 : 0.333)
    );
  };

  const handleTimeBlockClick = (targetText) => {
    // TODO: get rid of fakeSelectedCourse
    const departmentAndNumber = targetText.split();
    fakeSelectedCourse = { ...fakeSelectedCourse };
    fakeSelectedCourse.id = targetText;
    fakeSelectedCourse.department = departmentAndNumber[0];
    fakeSelectedCourse.number = departmentAndNumber[1];

    if (selectedCourse?.id !== fakeSelectedCourse.id) {
      selectCourse(targetText, fakeSelectedCourse);
    } else {
      selectCourse(null, null);
    }
  };

  const handleDocumentClick = (e) => {
    if (
      (containerRef?.current?.contains(e.target) && e.target.tagName === 'BUTTON') ||
      selectionDetailCardRef?.current?.contains(e.target)
    ) {
      return;
    }
    // Deselect all if click outside
    selectCourse(null, null);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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
                    onTimeBlockClick={handleTimeBlockClick}
                  />
                </Box>
              </Grid>
            )
        )}
      </Grid>
      {selectedCourse && (
        <Box
          ref={selectionDetailCardRef}
          sx={{
            position: 'absolute',
            width: '288px',
            height: '360px',
            left: '-288px',
            top: 'calc(50% - 180px)',
          }}
        >
          <CourseCard course={selectedCourse} />
        </Box>
      )}
    </Box>
  );
}

// TODO: actually fetch data from backend and get rid of this.
let fakeSelectedCourse = {
  id: '1',
  department: 'CS',
  number: '3810',
  name: 'Computer Orgnization',
  associated_course: [],
  description:
    'An in-depth study of computer architecture and design, including topics such as RISC and CISC instruction set ...',
  credit_hour: '4',
  prerequesite: [],
  review: 'http://localhost:3000/review/1',
};
