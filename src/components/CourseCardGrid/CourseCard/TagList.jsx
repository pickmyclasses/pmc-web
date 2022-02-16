import { Box, Chip } from '@mui/material';
import React from 'react';

export default function TagList({ tags, noWrap = false, size = 'medium', gutterLeft = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxHeight: noWrap ? '32px' : '',
        overflow: 'hidden',
        marginLeft: gutterLeft ? '8px' : '',
        '> *': { marginRight: '8px', marginBottom: noWrap ? '' : '8px' },
      }}
    >
      {tags.map((label) => (
        <Chip key={label} label={label} size={size} />
      ))}
    </Box>
  );
}
