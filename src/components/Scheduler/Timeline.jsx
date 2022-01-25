import React from 'react';
import { Box, Divider } from '@mui/material';
import TimeBlock from './TimeBlock';

/**
 * Represents a column in the shopping cart (one of Mon, Tue, etc.).
 *
 * @param {object} props
 * @param {number} props.rangeStart The earliest time of the day to show (default: 8 AM).
 * @param {number} props.rangeEnd The latest time of the day to show (default: 5 PM).
 * @param {{
 *   text: string,
 *   data: object,
 *   start: number,
 *   end: number,
 * }[]} props.events
 * @param {function(string):void} props.onTimeBlockMouseEnter
 * @param {function(string):void} props.onTimeBlockMouseLeave
 * @param {function(string):void} props.onTimeBlockClick
 */
export default function Timeline({
  rangeStart = 9 * 60,
  rangeEnd = 17 * 60,
  events = [],
  onTimeBlockClick = () => {},
}) {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {renderGridLines(rangeStart, rangeEnd)}
      {events.map((event) => renderEvent(event, rangeStart, rangeEnd, onTimeBlockClick))}
    </Box>
  );
}

const renderEvent = (event, rangeStart, rangeEnd, onTimeBlockClick) => {
  if (event.start >= rangeEnd || event.end <= rangeStart) return null; // can't fit in range

  const rangeSize = rangeEnd - rangeStart;
  const start = (Math.max(event.start, rangeStart) - rangeStart) / rangeSize;
  const end = (Math.min(event.end, rangeEnd) - rangeStart) / rangeSize;
  return (
    <TimeBlock
      key={event.text}
      text={event.text}
      top={start * 100 + '%'}
      height={(end - start) * 100 + '%'}
      onClick={() => onTimeBlockClick?.(event.text, event.data)}
    />
  );
};

const renderGridLines = (rangeStart, rangeEnd) => {
  const gridLines = [];
  for (let time = rangeStart; time < rangeEnd; time += 60) {
    const y = (time - rangeStart) / (rangeEnd - rangeStart);
    gridLines.push(
      <Divider
        key={time}
        sx={{ position: 'absolute', top: y * 100 + '%', width: '100%', opacity: 0.5 }}
      />
    );
  }
  return gridLines;
};
