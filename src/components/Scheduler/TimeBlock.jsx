import React from 'react';
import { Button } from '@mui/material';

export default function TimeBlock({ text, data, top, height, onClick }) {
  return (
    <Button
      text={text}
      variant='outlined'
      sx={{
        top,
        height,
        width: '83.3%',
        minWidth: 0,
        left: '8.33%',
        position: 'absolute',
        fontWeight: 'normal',
        fontSize: 'x-small',
        wordSpacing: '100vw',
        filter: 'grayscale(1) brightness(0.5)',
      }}
      onClick={() => onClick(text, data)}
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
