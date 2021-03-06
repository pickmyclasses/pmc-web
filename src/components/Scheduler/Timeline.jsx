import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useMount } from '../../utils';
import TimeBlock from './TimeBlock';
import TimeDataCard from './TimeDataCard';

/** Represents the timeline view in the shopping cart. */
export default function Timeline({
  defaultRangeStart = 9 * 3600,
  defaultRangeEnd = 16 * 3600,
  columnTitles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events = [],
  onSelect = () => {},
  alwaysGrayUnHighlighted = false,
}) {
  const theme = useTheme();

  const [rangeStart, setRangeStart] = useState(defaultRangeStart);
  const [rangeEnd, setRangeEnd] = useState(defaultRangeEnd);
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
    const handleDocumentMouseDown = (e) => {
      if (
        (!containerRef?.current?.contains(e.target) || e.target.tagName !== 'BUTTON') &&
        !dataCardRef?.current?.contains(e.target)
      ) {
        setSelectedEventData(null);
      }
    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  });

  // Auto zooms the timeline to fit all the events, with ranges rounded to the nearest hour that
  // to fits and having the same size as the default range.
  useEffect(() => {
    let earliestStart = Math.min(...events.map((x) => x.start)) || defaultRangeStart;
    earliestStart = Math.floor(earliestStart / 3600) * 3600;
    let latestEnd = Math.max(...events.map((x) => x.end)) || defaultRangeEnd;
    latestEnd = Math.ceil(latestEnd / 3600) * 3600;
    const range = defaultRangeEnd - defaultRangeStart;
    const defaultStart = Math.max(latestEnd - range, defaultRangeStart);
    const defaultEnd = Math.min(earliestStart + range, defaultRangeEnd);
    setRangeStart(Math.min(defaultStart, earliestStart));
    setRangeEnd(Math.max(defaultEnd, latestEnd));
  }, [events, defaultRangeStart, defaultRangeEnd]);

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
    setHasHighlights(events.some((x) => x.highlight));
    // eslint-disable-next-line
  }, [events]);

  // Compute which events should be slightly shifted right in the display. Some events are
  // shifted right to avoid covering other events and making other events unrecognizable.
  useEffect(() => {
    const unHighlighted = eventsShown.filter((x) => !x.highlight);
    let eventsWithConflicts = eventsShown.map((x) => hasConflictsWithSome(x, unHighlighted));
    let eventsShiftedRight = eventsShown.map((x) => +hasConflictsWithSome(x, eventsShown));
    for (let i = eventsShiftedRight.length - 2; i >= 0; i--) {
      if (eventsShiftedRight[i] > 0) {
        eventsShiftedRight[i] = (eventsShiftedRight[i + 1] + 1) % 2;
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
      eventsShown.some((x, i) => x.data.groupID === data.groupID && eventsWithConflicts[i])
    );
    setSelectedEventData(selectedEventData?.groupID !== data.groupID && data);
  };

  const renderEvent = (i, event) => {
    const {
      columnIndex,
      text,
      color,
      data,
      start,
      end,
      key,
      isActive,
      highlight,
      shouldDispatch,
      sx,
    } = event;

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
            variants={faderAnimationVariants}
            initial='initial'
            animate='active'
            exit='inactive'
            transition={{ duration: 0.25 }}
            sx={{
              position: 'absolute',
              top: top * 100 + '%',
              left: (columnIndex + 0.0833) * columnWidth + '%',
              zIndex: isMouseEntered
                ? 999
                : isSelected
                ? 998
                : highlight === 'outlined'
                ? 997
                : highlight
                ? 996
                : '',
              width: 0.667 * columnWidth + '%',
              height: (bottom - top) * 100 + '%',
              // Adapt the same transition style from MUI to the shifting movement.
              transform: eventsShiftedRight[i] ? 'translateX(25%)' : '',
              transition: getTransitionForStyles(['top', 'height', 'transform'], 0.375),
            }}
          >
            <TimeBlock
              text={text}
              color={
                highlight
                  ? hasConflicts
                    ? 'error'
                    : 'primary'
                  : alwaysGrayUnHighlighted ||
                    hasHighlights ||
                    (selectedEventData && !isSelected)
                  ? 'gray'
                  : color
              }
              darken={isMouseEntered || isSelected}
              variant={
                highlight
                  ? typeof highlight === 'string'
                    ? highlight
                    : 'outlined'
                  : 'contained'
              }
              sx={sx}
              data={data}
              onMouseEnter={() => setMouseEnteredEventData(data)}
              onMouseLeave={() => setMouseEnteredEventData(null)}
              onClick={() => {
                if (shouldDispatch) {
                  onSelect?.(data.groupID);
                  setSelectedEventData(null);
                } else {
                  handleTimeBlockClick(data);
                }
              }}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    );
  };

  const renderGridLines = () => {
    const gridLines = [];
    for (let time = 0, i = 0; time <= 86400; time += 3600) {
      const y = (time - rangeStart) / (rangeEnd - rangeStart);
      const isInRange = time >= rangeStart && time <= rangeEnd;
      gridLines.push(
        <AnimatePresence key={'gl' + time}>
          {isInRange && (
            <MotionDivider
              variants={faderAnimationVariants}
              initial='initial'
              animate='active'
              exit='inactive'
              textAlign='right'
              sx={{
                position: 'absolute',
                transform: 'translateY(-50%)',
                top: y * 100 + '%',
                width: 'calc(100% + 20px)',
                '::before': { width: '100%' },
                '> span': { fontSize: '10px', opacity: 0.75, padding: '0 4px 0 2px' },
                '::after': { display: 'none' },
                transition: getTransitionForStyles(['top'], 0.375),
              }}
            >
              {(time / 3600) % 12 || 12}
              {(time % 43200 === 0 || i === 0) && (time % 86400 < 43200 ? 'am' : 'pm')}
            </MotionDivider>
          )}
        </AnimatePresence>
      );
      if (isInRange) i++;
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
              onLinkClick={() => setSelectedEventData(null)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

const MotionBox = motion(Box);

const MotionDivider = motion(Divider);

const faderAnimationVariants = {
  initial: { opacity: 0 },
  active: { opacity: 1 },
  inactive: { opacity: 0 },
};

const getEventKey = ({ data, columnIndex }) => `${data.eventID}-${columnIndex}`;

export const getTransitionForStyles = (styles, duration = 0.25) =>
  styles.map((x) => `${x} ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`).join(', ');

export const hasConflictsWithSome = (x, events) => {
  return (
    x.isActive &&
    !!events.find(
      (y) =>
        y.isActive &&
        y !== x &&
        y.columnIndex === x.columnIndex &&
        x.start <= y.end &&
        y.start <= x.end
    )
  );
};
