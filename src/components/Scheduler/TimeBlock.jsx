import React from 'react';
import { useTheme } from '@mui/material';

export default function TimeBlock({ text, top, height }) {
  const theme = useTheme();

  return (
    <div
      style={{
        top,
        height,
        width: '87.5%',
        left: '6.25%',
        display: 'block',
        position: 'absolute',
        fontSize: 'x-small',
        wordSpacing: '100vw',
        border: '1px solid',
        boxSizing: 'border-box',
        borderColor: theme.palette.text.disabled,
        borderRadius: '4px',
        backgroundColor: theme.palette.common.white,
      }}
    >
      <div style={{ lineHeight: '1.25em', textAlign: 'center', marginTop: '8px' }}>{text}</div>
    </div>
  );
}
