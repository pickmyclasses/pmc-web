import { Box, colors, Typography } from '@mui/material';
import React from 'react';

export default function DaysIndicator({
  days = [],
  width = '144px',
  height = 1.5,
  showOnlyHighlightedDayNames = true,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  isMouseEntered = false,
}) {
  const isOnline = days.length === 1 && days[0] === -1;
  const numBlocks = dayNames.filter(Boolean).length;
  // These colors read colors[+isHighlighted][+isMouseEntered]
  const backgroundColors = [
    ['', ''],
    [colors.grey[300], colors.green[100]],
  ];
  const borderColors = [
    [colors.grey[300], colors.green[100]],
    [colors.grey[400], colors.green[300]],
  ];

  const renderDayIndication = (i, dayName, isHighlighted) => (
    <Typography
      key={i}
      align='center'
      lineHeight={height}
      fontSize='xx-small'
      sx={{
        opacity: isOnline ? 0 : 1,
        backgroundColor: backgroundColors[+isHighlighted][+isMouseEntered],
        border: `2px ${borderColors[+isHighlighted][+isMouseEntered]} solid`,
        width: 100 / numBlocks + '%',
        marginLeft: '-2px',
        boxSizing: 'border-box',
        zIndex: isHighlighted ? 999 : '',
      }}
    >
      {isHighlighted || !showOnlyHighlightedDayNames ? dayName : <>&nbsp;</>}
    </Typography>
  );

  const renderOnlineIndication = () => (
    <Typography
      align='center'
      lineHeight={height}
      variant='body2'
      sx={{
        width: `calc(100% - ${numBlocks * 2 - 2}px)`,
        marginLeft: '-2px',
        boxSizing: 'border-box',
      }}
    >
      Offered online
    </Typography>
  );

  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      position='relative'
      display='flex'
      width={`calc(${width} + ${numBlocks * 2}px)`}
      sx={{ userSelect: 'none', '> *': { transition: 'all 250ms' } }}
    >
      {isOnline
        ? renderOnlineIndication()
        : dayNames.map((name, i) => name && renderDayIndication(i, name, days.includes(i)))}
    </Box>
  );
}

const dayNames = [null, 'M', 'T', 'W', 'H', 'F', null];
