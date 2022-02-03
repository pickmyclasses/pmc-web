import React, { useRef, useState } from 'react';
import { Box, Divider, Grid, useTheme } from '@mui/material';
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
  rangeStart = 9 * 3600,
  rangeEnd = 17.5 * 3600,
  columnTitles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events = [],
}) {
  const theme = useTheme();

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

  const renderColumnTitle = (key, title) => (
    <Grid
      key={'cl' + key}
      item
      xs
      sx={{ textAlign: 'center', marginLeft: '-4.17%', color: theme.palette.text.secondary }}
    >
      {title}
    </Grid>
  );

  const handleTimeBlockClick = (_text, data) => {
    setDoesSelectedEventHaveConflicts(
      events.some((event, i) => event.data.id === data.id && eventsWithConflicts[i])
    );
    setSelectedEventData(selectedEventData?.id !== data.id && data);
  };

  /* Compute which events should be slightly shifted right in the display. Some events are
   * shifted right to avoid covering other events and making other events unrecognizable. */
  let eventsWithConflicts;
  let eventsShiftedRight;
  if (events) {
    events.sort((a, b) => a.columnIndex * 86400 + a.start - (b.columnIndex * 86400 + b.start));

    eventsWithConflicts = [];
    eventsShiftedRight = [];
    let prevEnd = -1;
    let prevColumnIndex = -1;
    let wasPrevShiftedRight = false;
    for (let event of events) {
      const hasConflicts = event.columnIndex === prevColumnIndex && event.start < prevEnd;
      if (hasConflicts) eventsWithConflicts[eventsWithConflicts.length - 1] = true;
      eventsWithConflicts.push(hasConflicts);

      const shiftedRight = hasConflicts && !wasPrevShiftedRight;
      eventsShiftedRight.push(shiftedRight);

      if (event.columnIndex !== prevColumnIndex || event.end >= prevEnd) {
        prevColumnIndex = event.columnIndex;
        prevEnd = event.end;
        wasPrevShiftedRight = shiftedRight;
      }
    }
  }

  const getTopByTime = (time) => (time - rangeStart) / (rangeEnd - rangeStart);

  const renderEvent = (i, { columnIndex, text, color, data, start, end }) => {
    if (start >= rangeEnd || end <= rangeStart) return null; // can't fit in range

    start = getTopByTime(Math.max(start, rangeStart));
    end = getTopByTime(Math.min(end, rangeEnd));

    const hasConflicts = eventsWithConflicts[i];
    const isMouseEntered = mouseEnteredEventData?.id === data.id;
    const isSelected = selectedEventData?.id === data.id;

    return (
      <Box
        key={`e${data.id}-${columnIndex}-${start}-${end}`}
        sx={{
          position: 'absolute',
          top: start * 100 + '%',
          left: (columnIndex + 0.0833) * columnWidth + '%',
          zIndex: isMouseEntered ? 999 : isSelected ? 998 : '',
          width: 0.667 * columnWidth + '%',
          height: (end - start) * 100 + '%',
          // Adapt the same transition style from MUI to the shifting movement.
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: eventsShiftedRight[i] ? 'translateX(25%)' : '',
        }}
      >
        <TimeBlock
          text={text}
          color={hasConflicts && !isSelected ? 'warning' : color}
          gray={!hasConflicts && color == null && !isSelected}
          darken={isMouseEntered}
          data={data}
          onMouseEnter={(_, data) => setMouseEnteredEventData(data)}
          onMouseLeave={() => setMouseEnteredEventData(null)}
          onClick={handleTimeBlockClick}
          variant={isSelected ? 'contained' : 'outlined'}
        />
      </Box>
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
    <Box sx={{ width: 'calc(100% - 16px)', height: '100%' }}>
      <Grid container sx={{ width: '100%', flex: 1, marginBottom: '4px' }}>
        {columnTitles.map((title, i) => renderColumnTitle(i, title))}
      </Grid>
      <Box
        ref={containerRef}
        sx={{ width: '100%', height: 'calc(100% - 32px)', position: 'relative' }}
      >
        {renderGridLines()}
        {events && events.map((event, i) => renderEvent(i, event))}
        {selectedEventData && (
          <Box
            ref={dataCardRef}
            sx={{
              position: 'absolute',
              right: 'calc(100% + 8px)',
              top: getTopByTime(selectedEventData.earliestStart) * 100 + '%',
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
