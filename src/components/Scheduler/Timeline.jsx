import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useMount } from '../../utils';
import TimeBlock from './TimeBlock';
import TimeDataCard from './TimeDataCard';

/**
 * Represents the timeline view in the shopping cart.
 *
 * @param {object} props
 * @param {number} props.rangeStart The earliest time of the day to show (default: 8 AM).
 * @param {number} props.rangeEnd The latest time of the day to show (default: 5 PM).
 * @param {string[]} props.columnTitles The column titles to display (default: the weekdays).
 * @param {{
 *   columnIndex: string,
 *   text: string,
 *   data: object,
 *   start: number,
 *   end: number,
 * }[]} props.events
 */
export default function Timeline({
  rangeStart = 8.5 * 3600,
  rangeEnd = 17.5 * 3600,
  columnTitles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events = [],
}) {
  const theme = useTheme();

  const [hasHighlights, setHasHighlights] = useState(false);
  const [eventsShown, setEventsShown] = useState([]);
  const [eventsWithConflicts, setEventsWithConflicts] = useState([]);
  const [eventsShiftedRight, setEventsShiftedRight] = useState([]);
  const [mouseEnteredEventData, setMouseEnteredEventData] = useState(null);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [doesSelectedEventHaveConflicts, setDoesSelectedEventHaveConflicts] = useState(false);

  const containerRef = useRef();
  const dataCardRef = useRef();

  const columnWidth = 100 / columnTitles.length;

  // Deselect any highlighted event on click outside.
  useMount(() => {
    const handleDocumentClick = (e) => {
      if (
        (!containerRef?.current?.contains(e.target) || e.target.tagName !== 'BUTTON') &&
        !dataCardRef?.current?.contains(e.target)
      ) {
        setSelectedEventData(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  });

  // Compute which events are no longer part of the timeline and are to fade out.  Preserve the
  // old events (events that are removed from the timeline) in the "shown" list to assist in
  // the fade-out animation. These old events are truly removed after their fade-out animations
  // finish.
  useEffect(() => {
    let newEventsShown = new Map();
    for (let oldEvent of eventsShown) {
      const key = getEventKey(oldEvent);
      newEventsShown.set(key, oldEvent);
      newEventsShown.get(key).isActive = false;
    }
    for (let newEvent of events) {
      const key = getEventKey(newEvent);
      if (newEventsShown.has(key)) {
        Object.assign(newEventsShown.get(key), { ...newEvent, isActive: true });
      } else {
        newEventsShown.set(key, { ...newEvent, key, isActive: true });
      }
    }
    setEventsShown(
      [...newEventsShown.values()].sort(
        (a, b) => a.columnIndex * 86400 + a.start - (b.columnIndex * 86400 + b.start)
      )
    );
    setHasHighlights(events.some((x) => x.isHighlighted));
    // eslint-disable-next-line
  }, [events]);

  // Compute which events should be slightly shifted right in the display. Some events are
  // shifted right to avoid covering other events and making other events unrecognizable.
  useEffect(() => {
    let eventsWithConflicts = [];
    let eventsShiftedRight = [];
    let prevEnd = -1;
    let prevColumnIndex = -1;
    let wasPrevActive = false;
    let wasPrevShiftedRight = false;
    for (let event of eventsShown) {
      const hasConflicts =
        event.isActive &&
        wasPrevActive &&
        event.columnIndex === prevColumnIndex &&
        event.start < prevEnd;

      if (hasConflicts && event.isActive && wasPrevActive) {
        eventsWithConflicts[eventsWithConflicts.length - 1] = true;
      }
      eventsWithConflicts.push(hasConflicts);

      const shiftedRight = hasConflicts && !wasPrevShiftedRight;
      eventsShiftedRight.push(shiftedRight);

      if (event.columnIndex !== prevColumnIndex || event.end >= prevEnd) {
        prevColumnIndex = event.columnIndex;
        prevEnd = event.end;
        wasPrevActive = event.isActive;
        wasPrevShiftedRight = shiftedRight;
      }
    }

    setEventsWithConflicts(eventsWithConflicts);
    setEventsShiftedRight(eventsShiftedRight);
  }, [eventsShown]);

  // Logic for rendering elements in the timeline.

  const renderColumnTitle = (key, title) => (
    <Grid key={'cl' + key} item xs sx={{ textAlign: 'center', marginLeft: '-4.17%' }}>
      <Typography variant='subtitle2' color={theme.palette.text.secondary}>
        {title}
      </Typography>
    </Grid>
  );

  const getTopByTime = (time) => (time - rangeStart) / (rangeEnd - rangeStart);

  const handleTimeBlockClick = (data) => {
    setDoesSelectedEventHaveConflicts(
      events.some((event, i) => event.data.groupID === data.groupID && eventsWithConflicts[i])
    );
    setSelectedEventData(selectedEventData?.groupID !== data.groupID && data);
  };

  const renderEvent = (i, event) => {
    const { columnIndex, text, color, data, start, end, key, isActive, isHighlighted, sx } =
      event;

    if (start >= rangeEnd || end <= rangeStart) return null; // can't fit in range

    const top = getTopByTime(Math.max(start, rangeStart));
    const bottom = getTopByTime(Math.min(end, rangeEnd));
    const hasConflicts = eventsWithConflicts[i];
    const isMouseEntered = mouseEnteredEventData?.groupID === data.groupID;
    const isSelected = selectedEventData?.groupID === data.groupID;

    return (
      <AnimatePresence
        key={'e' + key}
        onExitComplete={() =>
          requestAnimationFrame(() => {
            if (!event.isActive) {
              setEventsShown((eventsShown) => eventsShown.filter((x) => x.key !== key));
            }
          })
        }
      >
        {isActive && (
          <MotionBox
            variants={timeBlockContainerAnimationVariants}
            initial='initial'
            animate='active'
            exit='inactive'
            transition={{ duration: 0.25 }}
            sx={{
              position: 'absolute',
              top: top * 100 + '%',
              left: (columnIndex + 0.0833) * columnWidth + '%',
              zIndex: isMouseEntered || isHighlighted ? 999 : isSelected ? 998 : '',
              width: 0.667 * columnWidth + '%',
              height: (bottom - top) * 100 + '%',
              // Adapt the same transition style from MUI to the shifting movement.
              transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              transform: eventsShiftedRight[i] ? 'translateX(25%)' : '',
            }}
          >
            <TimeBlock
              text={text}
              color={
                isHighlighted
                  ? hasConflicts
                    ? 'error'
                    : 'success'
                  : hasHighlights
                  ? 'gray'
                  : color
              }
              darken={isMouseEntered || isSelected}
              variant={isHighlighted ? 'outlined' : 'contained'}
              sx={sx}
              data={data}
              onMouseEnter={() => setMouseEnteredEventData(data)}
              onMouseLeave={() => setMouseEnteredEventData(null)}
              onClick={() => handleTimeBlockClick(data)}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    );
  };

  const renderGridLines = () => {
    const gridLines = [];
    for (let time = Math.ceil(rangeStart / 3600) * 3600; time <= rangeEnd; time += 3600) {
      const y = (time - rangeStart) / (rangeEnd - rangeStart);
      gridLines.push(
        <Divider
          key={'gl' + time}
          textAlign='right'
          sx={{
            position: 'absolute',
            transform: 'translateY(-50%)',
            top: y * 100 + '%',
            width: 'calc(100% + 24px)',
            '::before': { width: '100%' },
            '> span': { fontSize: '12px', opacity: 0.667, padding: '0 4px 0 2px' },
            '::after': { display: 'none' },
          }}
        >
          {(time / 3600) % 12 || 12}
          {time === 43200 && 'p'}
        </Divider>
      );
    }
    return gridLines;
  };

  return (
    <Box width='calc(100% - 16px)' height='100%'>
      <Grid container sx={{ width: '100%', flex: 1, marginBottom: '4px' }}>
        {columnTitles.map((title, i) => renderColumnTitle(i, title))}
      </Grid>
      <Box
        ref={containerRef}
        sx={{ width: '100%', height: 'calc(100% - 32px)', position: 'relative' }}
      >
        {renderGridLines()}
        {eventsShown.map((event, i) => renderEvent(i, event))}
        {selectedEventData && (
          <Box
            ref={dataCardRef}
            sx={{
              position: 'absolute',
              right: 'calc(100% + 8px)',
              top: getTopByTime(selectedEventData.earliestStart) * 100 + '%',
              zIndex: 9999,
            }}
          >
            <TimeDataCard
              data={selectedEventData}
              hasConflicts={doesSelectedEventHaveConflicts}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

const MotionBox = motion(Box);

const timeBlockContainerAnimationVariants = {
  initial: { opacity: 0 },
  active: { opacity: 1 },
  inactive: { opacity: 0 },
};

const getEventKey = ({ data, columnIndex }) => `${data.eventID}-${columnIndex}`;
