import { Box, Chip } from '@mui/material';
import React from 'react';

export default function TagList({
  tags,
  noWrap = false,
  size = 'medium',
  gutterLeft = false,
  variant = 'contained',
  color = 'default',
  disableInteractive = false,
}) {
  const maxHeight = { small: '24px', medium: '32px', large: '40px' }[size];
  const fontSize = { small: '12px', medium: '', large: '16px' }[size];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: '288px',
        maxHeight: noWrap ? maxHeight : 'fit-content',
        overflow: 'hidden',
        marginLeft: gutterLeft ? '8px' : '',
        '> *': { marginRight: '8px', marginBottom: noWrap ? '' : '8px' },
        pointerEvents: disableInteractive && 'none',
      }}
    >
      {tags.map((label) => (
        <Chip
          key={label}
          label={label}
          size={size}
          sx={{ fontSize }}
          variant={variant}
          color={color}
        />
      ))}
    </Box>
  );
}
