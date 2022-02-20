import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { formatCourseName, parseDayList, parseTime } from '../../utils';
import Timeline from './Timeline';
import ImageColors from 'react-native-image-colors';
import Color from 'color';

/** The shopping cart resides in the top part of the scheduler. */
export default function ShoppingCart({ classes }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => generateSessions(classes, setSessions), [classes]);

  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='column'
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Timeline events={sessions} />
    </Box>
  );
}

/**
 * Generates a list of sessions for each weekday from a list of classes and belonged courses.
 */
const generateSessions = (classes, onGenerated) => {
  let sessions = [];
  for (let { classData, course, highlight } of classes) {
    for (let dayOffered of parseDayList(classData.OfferDate)) {
      const courseCode = formatCourseName(course.CatalogCourseName);
      const relatedClasses = classes
        .map(({ classData }) => classData)
        .filter((x) => x.CourseID === course.ID);

      let sessionData = {
        columnIndex: dayOffered - 1,
        start: parseTime(classData.StartTime),
        end: parseTime(classData.EndTime),
        color: 'gray',
        isHighlighted: highlight,
        text: courseCode,
        // The following `data` object determines what to display in the timeline detail
        // card (which shows up when clicking on a time block).
        // TODO Q: Extract TimeDataCard so that it's handled by ShoppingCart. Let Timeline
        // emit an onTimeBlockClick event instead of handling showing the detail card. Put
        // all this complex data construction into the updated TimeDataCard.
        data: {
          eventID: classData.ID,
          groupID: course.ID,
          earliestStart: Math.min(
            ...relatedClasses.map((classData) => parseTime(classData.StartTime))
          ),
          title: courseCode,
          subtitle: course.Title,
          description: relatedClasses
            .map((classData, i) => (
              <div key={i}>
                {getComponent(classData)}:{' '}
                <b>
                  {classData.OfferDate} {classData.StartTime}–{classData.EndTime}
                </b>
              </div>
            ))
            .concat(`Professor: ${getInstructor(classData)}`),
          topBorderColor: 'gray',
          coursePageURL: `/course/${course.ID}`,
        },
      };

      sessions.push(
        new Promise((onAssignedColors) =>
          ImageColors.getColors(course.ImageURL, { cache: true }).then((palette) => {
            const representativeColor = Color(palette.vibrant).desaturate(0.375);
            sessionData.color = sessionData.data.topBorderColor = representativeColor;
            onAssignedColors(sessionData);
          })
        )
      );
    }
  }
  Promise.all(sessions).then((x) => onGenerated(x));
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
  Object.values(classData).find((value) => value && /^[A-Z\s]+,[A-Z,\s]+$/.test(String(value)));
