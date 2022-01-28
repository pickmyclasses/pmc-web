import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, useTheme } from '@mui/material';
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
 * }[]} props.eventsByColumn
 */
export default function Timeline({
  rangeStart = 9 * 3600,
  rangeEnd = 17 * 3600,
  columnTitles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events = [],
}) {
  const theme = useTheme();

  const [selectedEventData, setSelectedEventData] = useState(null);

  const containerRef = useRef();
  const dataCardRef = useRef();

  const columnWidth = 100 / columnTitles.length;

  // Deselect any highlighted event on click outside.
  useEffect(() => {
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
  }, []);

  const renderColumnTitle = (key, title) => (
    <Grid key={'cl' + key} item xs>
      <div style={{ textAlign: 'center', color: theme.palette.text.secondary }}>{title}</div>
    </Grid>
  );

  const handleTimeBlockClick = (_text, data) => {
    setSelectedEventData(selectedEventData?.id !== data.id && data);
  };

  const getTopByTime = (time) => (time - rangeStart) / (rangeEnd - rangeStart);

  const renderEvent = (key, { columnIndex, text, data, start, end }) => {
    if (start >= rangeEnd || end <= rangeStart) return null; // can't fit in range

    start = getTopByTime(Math.max(start, rangeStart));
    end = getTopByTime(Math.min(end, rangeEnd));

    return (
      <TimeBlock
        key={'e' + key}
        text={text}
        data={data}
        onClick={handleTimeBlockClick}
        sx={{
          top: start * 100 + '%',
          left: columnIndex * columnWidth + columnWidth * 0.125 + '%',
          width: columnWidth * 0.75 + '%',
          height: (end - start) * 100 + '%',
          opacity: !selectedEventData || selectedEventData.id === data.id ? 1 : 0.5,
          filter: selectedEventData?.id === data.id ? '' : 'grayscale(1) brightness(0.75)',
        }}
      />
    );
  };

  const renderGridLines = () => {
    const gridLines = [];
    for (let time = Math.ceil(rangeStart / 3600) * 3600; time < rangeEnd; time += 3600) {
      const y = (time - rangeStart) / (rangeEnd - rangeStart);
      gridLines.push(
        <>
          <Divider
            key={'gl' + time}
            sx={{ position: 'absolute', top: y * 100 + '%', width: '100%', opacity: 0.5 }}
          />
          <div
            key={'glt' + time}
            style={{
              position: 'absolute',
              top: y * 100 + '%',
              left: 'calc(100% + 4px)',
              marginTop: '-6px',
              width: '24px',
              fontSize: '12px',
              opacity: 0.5,
            }}
          >
            {(time / 3600) % 12 || 12}
            {time == 43200 && 'p'}
          </div>
        </>
      );
    }
    return gridLines;
  };

  return (
    <Box sx={{ width: 'calc(100% - 16px)', height: '100%' }}>
      <Grid container sx={{ width: '100%', flex: 1, marginBottom: '4px' }}>
        {columnTitles.map((title, i) => renderColumnTitle(i, title))}
      </Grid>
      <Box ref={containerRef} sx={{ width: '100%', height: '100%', position: 'relative' }}>
        {events && (
          <>
            {renderGridLines()}
            {events.map((event, i) => renderEvent(i, event))}
          </>
        )}
        {selectedEventData && (
          <Box
            ref={dataCardRef}
            sx={{
              position: 'absolute',
              width: '360px',
              left: '-368px',
              top: getTopByTime(selectedEventData.earliestStart) * 100 + '%',
            }}
          >
            <TimeDataCard data={selectedEventData} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
