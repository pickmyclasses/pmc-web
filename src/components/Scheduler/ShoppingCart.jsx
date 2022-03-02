import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { formatCourseName, parseDayList, parseTime } from '../../utils';
import Timeline from './Timeline';
import ImageColors from 'react-native-image-colors';
import Color from 'color';
import { pluralize } from '../../utils';
import CourseScheduleSummary from './CourseScheduleSummary';

/** The shopping cart resides in the top part of the scheduler. */
export default function ShoppingCart({
  classes,
  noSummary = false,
  timelineColumnTitles = undefined,
}) {
  const theme = useTheme();

  const [sessionGenerationResolver, setSessionGenerationResolver] = useState({});
  const [sessions, setSessions] = useState([]);
  const [minCredits, setMinCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(0);
  const [numCourses, setNumCourses] = useState(0);
  const [numOnlineCourses, setNumOnlineCourses] = useState(false);
  const [hasHighlights, setHasHighlights] = useState(false);

  useEffect(() => {
    // Enumerate each class' meet times and turn them into individual sessions/events. First
    // the previous resolver so if old loading came with a delay, it wouldn't override new
    // results.
    sessionGenerationResolver.onGenerated = null;
    let newResolver = { onGenerated: setSessions };
    setSessionGenerationResolver(newResolver);
    generateSessions(classes, newResolver);

    // Compute the content to display in the bottom summary text.
    setHasHighlights(classes.some((x) => x.highlight));
    let courseByID = {};
    let minCredits = 0;
    let maxCredits = 0;
    for (let { classData, course } of classes) {
      if (courseByID.hasOwnProperty(course.id)) {
        courseByID[course.id].isOnline |= !classData.offerDate;
      } else {
        courseByID[course.id] = { course, isOnline: !classData.offerDate };
        minCredits += +course.minCredit;
        maxCredits += +course.maxCredit;
      }
    }
    setMinCredits(minCredits);
    setMaxCredits(maxCredits);
    const courses = Object.values(courseByID);
    setNumCourses(courses.length);
    setNumOnlineCourses(courses.filter((x) => x.isOnline).length);
    // eslint-disable-next-line
  }, [classes]);

  return (
    <Box display='flex' flexDirection='column' position='relative' width='100%' height='100%'>
      <Box flex={1}>
        <Timeline events={sessions} columnTitles={timelineColumnTitles} />
      </Box>
      {!noSummary && (
        <Typography
          marginTop='12px'
          variant='caption'
          align='center'
          color={hasHighlights ? theme.palette.primary.main : ''}
        >
          {pluralize(numCourses, 'course')}
          {numOnlineCourses > 0 ? <>&nbsp;({pluralize(numOnlineCourses, 'online')})</> : ''}
          &nbsp;&nbsp;•&nbsp;&nbsp;
          {minCredits === maxCredits ? '' : minCredits + '–'}
          {pluralize(maxCredits, 'credit')}
        </Typography>
      )}
    </Box>
  );
}

/**
 * Generates a list of sessions for each weekday from a list of classes and belonged courses.
 */
const generateSessions = (classes, resolver) => {
  let sessions = [];
  for (let { classData, course, highlight } of classes) {
    for (let dayOffered of parseDayList(classData.offerDate)) {
      if (dayOffered === -1) continue; // online course

      const courseCode = formatCourseName(course.catalogCourseName);
      const relatedClasses = classes
        .map(({ classData }) => classData)
        .filter((x) => x.courseID === course.id);

      let sessionData = {
        columnIndex: dayOffered - 1,
        start: parseTime(classData.startTime),
        end: parseTime(classData.endTime),
        color: 'gray',
        isHighlighted: highlight,
        text: courseCode,
        // The following `data` object determines what to display in the timeline detail
        // card (which shows up when clicking on a time block).
        // TODO Q: Extract TimeDataCard so that it's handled by ShoppingCart. Let Timeline
        // emit an onTimeBlockClick event instead of handling showing the detail card. Put
        // all this complex data construction into the updated TimeDataCard.
        data: {
          eventID: classData.id,
          groupID: course.id,
          earliestStart: Math.min(
            ...relatedClasses.map((classData) => parseTime(classData.startTime))
          ),
          title: courseCode,
          subtitle: course.title,
          description: <CourseScheduleSummary plainText classes={relatedClasses} />,
          topBorderColor: 'gray',
          coursePageURL: `/course/${course.id}`,
        },
      };

      sessions.push(
        new Promise((onAssignedColors) =>
          ImageColors.getColors(course.ImageURL, { cache: true }).then((palette) => {
            const color = Color(palette.vibrant).desaturate(0.375).lightness(41.7);
            sessionData.color = sessionData.data.topBorderColor = color;
            onAssignedColors(sessionData);
          })
        )
      );
    }
  }
  // Using a resolver object this way prevents the onGenerated callback being called later than
  // the next update of session generation.
  Promise.all(sessions).then((x) => resolver.onGenerated?.(x));
};

// TODO Q: Some classes in the backend have their component name wrongly listed in
// a field other than 'Component'. After the backend is fixed, get rid of these
// helpers and access `classData[...]` directly.
export const getComponent = (classData) =>
  Object.values(classData).find((value) =>
    ['Lecture', 'Laboratory', 'Discussion', 'Seminar'].includes(value)
  );

// TODO Q: This is assuming a class only has one instructor, which may be false.
export const getInstructor = (classData) =>
  Object.values(classData).find(
    (value) => value && /^[A-Z\s]+,[A-Z,\s]+$/.test(String(value))
  ) || 'TBD';
