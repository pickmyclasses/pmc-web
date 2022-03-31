import React, { useContext, useEffect, useState } from 'react';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import { formatCourseName, parseDayList, parseTime } from '../../utils';
import Timeline from './Timeline';
// import Color from 'color';
import { pluralize } from '../../utils';
import CourseScheduleSummary, { formatTimeRange } from './CourseScheduleSummary';
import { getColorByCourse, addOrUpdateCustomEvent, removeCustomEventByID } from '../../api';
import PreventableLink from '../PreventableNavigation/PreventableLink';
import { SchedulerContext } from './ContainerWithScheduler';
import { UserContext } from 'App';

/** The shopping cart resides in the top part of the scheduler. */
export default function ShoppingCart({
  classes,
  customEvents,
  noSummary = false,
  timelineColumnTitles = undefined,
  allowEditingCustomEvents = false,
  addEventOnClick = false,
  ...timeLineProps
}) {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { refreshSchedulerData } = useContext(SchedulerContext);

  const [sessionGenerationResolver, setSessionGenerationResolver] = useState({});
  const [sessions, setSessions] = useState([]);
  const [minCredits, setMinCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(0);
  const [numCourses, setNumCourses] = useState(0);
  const [numOnlineCourses, setNumOnlineCourses] = useState(false);
  const [hasHighlights, setHasHighlights] = useState(false);
  const [editingCustomEvent, setEditingCustomEvent] = useState(null);

  useEffect(() => {
    // Enumerate each class' meet times and turn them into individual sessions/events. First
    // the previous resolver so if old loading came with a delay, it wouldn't override new
    // results.
    sessionGenerationResolver.onGenerated = null;
    let newResolver = { onGenerated: setSessions };
    setSessionGenerationResolver(newResolver);
    generateSessions(
      classes,
      customEvents,
      allowEditingCustomEvents,
      editingCustomEvent,
      newResolver
    );

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
  }, [classes, customEvents, editingCustomEvent]);

  return (
    <Box display='flex' flexDirection='column' position='relative' width='100%' height='100%'>
      <Box flex={1}>
        <Timeline
          events={sessions}
          columnTitles={timelineColumnTitles}
          onEditingEventChange={(event) => setEditingCustomEvent(event)}
          onEditingEventCancel={() => setEditingCustomEvent(null)}
          onEditingEventDelete={(onComplete) => {
            removeCustomEventByID(editingCustomEvent.eventID).then(() => {
              setEditingCustomEvent(null);
              refreshSchedulerData(() => {
                onComplete();
                setEditingCustomEvent(null);
              });
            });
          }}
          onEditingEventSave={(onComplete) => {
            addOrUpdateCustomEvent(user.userID, sessionToCustomEvent(editingCustomEvent)).then(
              () => {
                refreshSchedulerData(() => {
                  onComplete();
                  setEditingCustomEvent(null);
                });
              }
            );
          }}
          addEventOnClick={!!user && addEventOnClick}
          onAddEvent={(event) => setEditingCustomEvent(event)}
          {...timeLineProps}
        />
      </Box>
      {!noSummary && (
        <Stack alignItems='center'>
          <Typography
            marginTop='12px'
            variant='body2'
            color={hasHighlights ? theme.palette.primary.main : ''}
          >
            {pluralize(numCourses, 'course')}
            {numOnlineCourses > 0 ? (
              <>&nbsp;({pluralize(numOnlineCourses, 'online')})</>
            ) : (
              ''
            )}, {minCredits === maxCredits ? '' : minCredits + '–'}
            {pluralize(maxCredits, 'credit')}
          </Typography>
          <Link
            component={PreventableLink}
            to='/profile/schedule'
            variant='caption'
            color='gray'
            underline='hover'
          >
            View schedule details
          </Link>
        </Stack>
      )}
    </Box>
  );
}

/**
 * Generates a list of sessions for each weekday from a list of classes and belonged courses.
 */
const generateSessions = (
  classes,
  customEvents,
  areCustomEventsEditable,
  editingCustomEvent,
  resolver
) => {
  let sessions = [];
  // Generate sessions from classes.
  for (let { classData, course, highlight, selectionID } of classes) {
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
        details: (
          <>
            {getComponent(classData)}
            <br />
            {formatTimeRange(classData)}
          </>
        ),
        color: 'gray',
        highlight,
        shouldDispatch: !!selectionID,
        text: courseCode,
        // The following `data` object determines what to display in the timeline detail
        // card (which shows up when clicking on a time block).
        // TODO Q: Extract TimeDataCard so that it's handled by ShoppingCart. Let Timeline
        // emit an onTimeBlockClick event instead of handling showing the detail card. Put
        // all this complex data construction into the updated TimeDataCard.
        data: {
          eventID: classData.id,
          groupID: selectionID || course.id,
          firstColumn: Math.min(...relatedClasses.map((x) => parseDayList(x.offerDate)[0])) - 1,
          earliestStart: Math.min(...relatedClasses.map((x) => parseTime(x.startTime))),
          title: courseCode,
          subtitle: course.title,
          description: <CourseScheduleSummary plainText classes={relatedClasses} />,
          color: 'gray',
          editURL: `/course/${course.id}/registration`,
          infoURL: `/course/${course.id}`,
          isEditable: false,
        },
      };

      sessions.push(
        new Promise((onAssignedColors) => {
          // ImageColors.getColors(course.ImageURL, { cache: true }).then((palette) => {
          const color = getColorByCourse(course);
          sessionData.color = sessionData.data.color = color;
          onAssignedColors(sessionData);
          // })
        })
      );
    }
  }
  // Generate sessions from custom events.
  let events = customEvents;
  if (editingCustomEvent) {
    events = events
      .filter((x) => +x.id !== +editingCustomEvent?.eventID)
      .concat(sessionToCustomEvent(editingCustomEvent)); // Always show changes live
  }
  for (let event of events) {
    for (let day of event.days) {
      let sessionData = {
        columnIndex: day - 1,
        start: event.startTime,
        end: event.endTime,
        details: (
          <>
            {event.title && (
              <>
                {event.kind}
                <br />
              </>
            )}
            {formatTimeRange(event)}
          </>
        ),
        color: 'gray',
        variant: 'outlined',
        text: event.title || event.kind,
        // The following `data` object determines what to display in the timeline detail
        // card (which shows up when clicking on a time block).
        // TODO Q: Extract TimeDataCard so that it's handled by ShoppingCart. Let Timeline
        // emit an onTimeBlockClick event instead of handling showing the detail card. Put
        // all this complex data construction into the updated TimeDataCard.
        data: {
          eventID: event.id,
          groupID: event.id,
          firstColumn: Math.min(...event.days) - 1,
          earliestStart: event.startTime,
          title: event.title,
          label: event.kind,
          subtitle: event.description,
          color: 'gray',
          editURL: !areCustomEventsEditable && '/profile/schedule?selected=' + event.id,
          isEditable: areCustomEventsEditable,
          days: event.days,
          start: event.startTime,
          end: event.endTime,
        },
      };

      sessions.push(
        new Promise((onAssignedColors) => {
          sessionData.color = sessionData.data.color = event.color;
          onAssignedColors(sessionData);
        })
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
    (value) => value && /^[A-Za-z\s]+,[A-Za-z,\s]+$/.test(String(value))
  );

const sessionToCustomEvent = ({
  eventID,
  title,
  label,
  subtitle,
  color,
  days,
  start,
  end,
}) => ({
  id: eventID,
  title,
  kind: label,
  description: subtitle,
  color,
  days,
  startTime: start,
  endTime: end,
});
