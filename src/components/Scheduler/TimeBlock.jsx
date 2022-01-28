import React from 'react';
import { Button } from '@mui/material';

export default function TimeBlock({ text, data, sx, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <Button
      text={text}
      variant='outlined'
      sx={{
        ...sx,
        minWidth: 0,
        position: 'absolute',
        // fontWeight: 'normal',
        borderRadius: '0px',
        fontSize: 'x-small',
        wordSpacing: '100vw',
      }}
      onMouseEnter={() => onMouseEnter?.(text, data)}
      onMouseLeave={() => onMouseLeave?.(text, data)}
      onClick={() => onClick?.(text, data)}
    >
      <div
        style={{
          lineHeight: '1.25em',
          letterSpacing: 0,
          marginTop: '1px',
          pointerEvents: 'none',
        }}
      >
        {text}
      </div>
    </Button>
  );
}
