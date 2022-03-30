import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, Portal, Typography, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import TimeBlock from './TimeBlock';
import TimeDataCard from './TimeDataCard';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import { useLocation } from 'react-router-dom';

/** Represents the timeline view in the shopping cart. */
export default function Timeline({
  defaultRangeStart = 9 * 3600,
  defaultRangeEnd = 16 * 3600,
  columnTitles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events = [],
  onSelect = () => {},
  onEditingEventChange = () => {},
  onEditingEventSave = () => {},
  onEditingEventCancel = () => {},
  onEditingEventDelete = () => {},
  alwaysGrayUnHighlighted = false,
  onGroupIDsWithConflictsChange = () => {},
  showShadowUnderColumnTitles = false,
  showHalfHourMarks = false,
  expandAllTimeOnMarks = false,
  largerTimeOnMarks = false,
  showDetailsInTimeBlocks = false,
  timeDataCardContainer = undefined,
}) {
  const theme = useTheme();
  const location = useLocation();
  const { isNavigationAllowed, navigateIfAllowed } = useContext(PreventableNavigationContext);

  const [rangeStart, setRangeStart] = useState(defaultRangeStart);
  const [rangeEnd, setRangeEnd] = useState(defaultRangeEnd);
  const [hasHighlights, setHasHighlights] = useState(false);
  const [eventsShown, setEventsShown] = useState([]);
  const [eventsWithConflicts, setEventsWithConflicts] = useState([]);
  const [eventsShiftedRight, setEventsShiftedRight] = useState([]);
  const [mouseEnteredEventData, setMouseEnteredEventData] = useState(null);
  const [selectedEventGroupID, setSelectedEventGroupID] = useState(NaN);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [selectedEventHasConflicts, setSelectedEventHasConflicts] = useState(false);
  const [isDataCardEditable, setIsDataCardEditable] = useState(false);
  const [hasSelectedDefaultEvent, setHasSelectedDefaultEvent] = useState(false);

  const containerRef = useRef();
  const dataCardDefaultContainerRef = useRef();
  const dataCardRef = useRef();

  const columnWidth = 100 / columnTitles.length;

  // Deselect any highlighted event on click outside.
  useEffect(() => {
    const handleDocumentMouseDown = (e) => {
      if (
        !isDataCardEditable &&
        (!containerRef?.current?.contains(e.target) || e.target.tagName !== 'BUTTON') &&
        !dataCardRef?.current?.contains(e.target)
      ) {
        setSelectedEventGroupID(NaN);
      }
    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, [isDataCardEditable]);

  // Auto zooms the timeline to fit all the events, with ranges rounded to the nearest hour that
  // to fits and having the same size as the default range.
  useEffect(() => {
    let earliestStart =
      Math.min(...events.filter((x) => !x.data.isEditable).map((x) => x.start)) ||
      defaultRangeStart;
    earliestStart = Math.floor(earliestStart / 3600) * 3600;
    let latestEnd =
      Math.max(...events.filter((x) => !x.data.isEditable).map((x) => x.end)) ||
      defaultRangeEnd;
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
  }, [events, hasSelectedDefaultEvent, location.search]);

  // Compute which events should be slightly shifted right in the display. Some events are
  // shifted right to avoid covering other events and making other events unrecognizable.
  useEffect(() => {
    const targetEvents = eventsShown.filter((x) => !x.ignoreConflicts);
    const newEventsWithConflicts = eventsShown.map((x) =>
      hasConflictsWithSome(x, targetEvents)
    );
    setEventsWithConflicts(newEventsWithConflicts);
    setEventsShiftedRight(getShiftedRight(eventsShown));

    // Find the data of the selected event. If this is the first render, select the default
    // event according to the `selected` URL search parameter.
    let targetGroupID = selectedEventGroupID;
    if (eventsShown.length && !hasSelectedDefaultEvent) {
      const params = Object.fromEntries(new URLSearchParams(location.search).entries());
      targetGroupID = +params.selected;
      if (!isNaN(targetGroupID)) {
        setSelectedEventGroupID(targetGroupID);
        setIsDataCardEditable(true);
      }
      setHasSelectedDefaultEvent(true);
    }
    const selectedEventData =
      targetGroupID &&
      eventsShown.find((x) => x.isActive && x.data.groupID === targetGroupID)?.data;
    setSelectedEventData(selectedEventData || null);
    if (!selectedEventData) setSelectedEventGroupID(NaN);
    setSelectedEventHasConflicts(
      eventsShown.some(
        (x, i) => x.data.groupID === selectedEventGroupID && newEventsWithConflicts[i]
      )
    );
  }, [eventsShown, selectedEventGroupID, hasSelectedDefaultEvent, location.search]);

  // Report which (non-outlined) events have conflicts.
  useEffect(() => {
    if (onGroupIDsWithConflictsChange) {
      const targetEvents = eventsShown.filter((x) => !x.ignoreConflicts);
      const groupIDsWithConflicts = Array.from(
        new Set(
          targetEvents
            .filter((x) => hasConflictsWithSome(x, targetEvents))
            .map((x) => x.data.groupID)
        )
      );
      onGroupIDsWithConflictsChange(groupIDsWithConflicts);
    }
  }, [eventsShown, onGroupIDsWithConflictsChange]);

  // Logic for rendering elements in the timeline.

  const renderColumnTitle = (key, title) => (
    <Grid key={'cl' + key} item xs sx={{ textAlign: 'center', marginLeft: '-4.17%' }}>
      <Typography variant='subtitle2' color={theme.palette.text.secondary}>
        {title}
      </Typography>
    </Grid>
  );

  const getTopByTime = (time) => (time - rangeStart) / (rangeEnd - rangeStart);

  const handleTimeBlockClick = ({ data }) => {
    if (isDataCardEditable && !isNavigationAllowed) {
      // Don't deselect; show flash
      return void navigateIfAllowed('#');
    }

    setSelectedEventGroupID(selectedEventGroupID !== data.groupID ? data.groupID : NaN);
  };

  const renderEvent = (i, event) => {
    const {
      columnIndex,
      text,
      details,
      color,
      data,
      start,
      end,
      key,
      isActive,
      highlight,
      variant,
      shouldDispatch,
      sx,
    } = event;

    if (start >= rangeEnd || end <= rangeStart) return null; // can't fit in range

    const top = getTopByTime(Math.max(start, rangeStart));
    const bottom = getTopByTime(Math.min(end, rangeEnd));
    const hasConflicts = eventsWithConflicts[i];
    const isMouseEntered = mouseEnteredEventData?.groupID === data.groupID;
    const isSelected = selectedEventGroupID === data.groupID;

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
                    ? 'warning'
                    : 'primary'
                  : alwaysGrayUnHighlighted ||
                    hasHighlights ||
                    (selectedEventGroupID && !isSelected)
                  ? 'gray'
                  : color
              }
              darken={isMouseEntered || isSelected}
              variant={
                variant ||
                (highlight
                  ? typeof highlight === 'string'
                    ? highlight
                    : 'outlined'
                  : 'contained')
              }
              showDetails={showDetailsInTimeBlocks}
              sx={sx}
              details={details}
              data={data}
              onMouseEnter={() => setMouseEnteredEventData(data)}
              onMouseLeave={() => setMouseEnteredEventData(null)}
              onClick={() => {
                if (shouldDispatch) {
                  onSelect?.(data.groupID);
                  setSelectedEventGroupID(NaN);
                } else {
                  handleTimeBlockClick(event);
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
    for (let time = 0, i = 0; time <= 86400; time += showHalfHourMarks ? 1800 : 3600) {
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
                filter: time % 3600 && 'opacity(0.667)',
                '::before': { width: '100%' },
                '> span': {
                  fontSize: largerTimeOnMarks ? '14px' : '10px',
                  opacity: 0.75,
                  padding: '0 4px 0 2px',
                },
                '::after': { display: 'none' },
                transition: getTransitionForStyles(['top'], 0.375),
              }}
            >
              {time % 3600 === 0 && (
                <>
                  {(time / 3600) % 12 || 12}
                  {(expandAllTimeOnMarks || time % 43200 === 0 || i === 0) &&
                    (time % 86400 < 43200 ? 'am' : 'pm')}
                </>
              )}
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
      <Box
        width='calc(100% + 16px)'
        position='sticky'
        top='-1px'
        zIndex={1001}
        paddingTop='12px'
        marginTop='-12px'
        marginBottom={showShadowUnderColumnTitles ? '-8px' : '4px'}
        sx={{
          background: 'white',
          ...(showShadowUnderColumnTitles && {
            '&:after': {
              content: '" "',
              position: 'absolute',
              width: '100%',
              height: '3px',
              boxShadow: '0 3px 3px -3px inset',
            },
          }),
        }}
      >
        <Grid
          container
          sx={{
            width: 'calc(100% - 16px)',
            flex: 1,
            paddingBottom: showShadowUnderColumnTitles ? '4px' : '',
          }}
        >
          {columnTitles.map((title, i) => renderColumnTitle(i, title))}
        </Grid>
      </Box>
      <Box
        ref={containerRef}
        sx={{ width: '100%', height: 'calc(100% - 32px)', position: 'relative' }}
      >
        {renderGridLines()}
        {eventsShown.map((event, i) => renderEvent(i, event))}
        <Box ref={dataCardDefaultContainerRef} />
        {selectedEventData && (
          <Portal container={timeDataCardContainer || dataCardDefaultContainerRef?.current}>
            <Box
              position='absolute'
              right={`calc(${100 - selectedEventData.firstColumn * columnWidth}% + 8px)`}
              top={`max(${getTopByTime(selectedEventData.earliestStart) * 100}%, 0%)`}
              zIndex={1000}
              sx={{
                transition: isDataCardEditable && getTransitionForStyles(['right', 'top'], 0.5),
              }}
            >
              <TimeDataCard
                ref={dataCardRef}
                data={selectedEventData}
                hasConflicts={selectedEventHasConflicts}
                onLinkClick={() => setSelectedEventGroupID(NaN)}
                isEditable={isDataCardEditable}
                onIsEditableChange={setIsDataCardEditable}
                onEditingEventChange={onEditingEventChange}
                onEditingEventDelete={onEditingEventDelete}
                onEditingEventSave={onEditingEventSave}
                onEditingEventCancel={onEditingEventCancel}
              />
            </Box>
          </Portal>
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

const getShiftedRight = (events, maxShifts = 2) => {
  /** @type {[end: Number, shiftedRight: Number][]} */
  let stack = [[Infinity, maxShifts - 1]];
  let currColumn = -1;
  let res = [];
  for (let event of events) {
    if (!event.isActive) {
      res.push(0);
      continue;
    }
    if (event.columnIndex !== currColumn) stack.splice(1);
    currColumn = event.columnIndex;
    while (stack[stack.length - 1][0] <= event.start) stack.pop();
    const shiftedRight = (stack[stack.length - 1][1] + 1) % maxShifts;
    res.push(shiftedRight);
    stack.push([event.end, shiftedRight]);
  }
  return res;
};
