import { Stack, Typography, useTheme } from '@mui/material';
import React, { createElement } from 'react';

export default function LabelWithIcon({
  iconType,
  label,
  color = undefined,
  align = 'center',
  height = '1.5em',
  size = 'medium',
  noWrap = false,
  variant = undefined,
}) {
  const theme = useTheme();

  return (
    <Stack direction='row' alignItems={align} height={height} minWidth={noWrap && 0}>
      {createElement(iconType, {
        color,
        fontSize: size,
        sx: { marginRight: size === 'small' ? '4px' : '8px' },
      })}
      <Typography
        variant={variant || `body${size === 'small' ? 2 : 1}`}
        color={theme.palette[color]?.dark}
        noWrap={noWrap}
      >
        {label}
      </Typography>
    </Stack>
  );
}
