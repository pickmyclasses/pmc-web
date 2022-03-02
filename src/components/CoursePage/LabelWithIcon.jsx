import { Stack, Typography, useTheme } from '@mui/material';
import React, { createElement } from 'react';

export default function LabelWithIcon({
  iconType,
  label,
  color = undefined,
  align = 'center',
  height = '1.5em',
}) {
  const theme = useTheme();

  return (
    <Stack direction='row' alignItems={align} height={height}>
      {createElement(iconType, { color, fontSize: 'small', sx: { marginRight: '8px' } })}
      <Typography variant='body2' color={theme.palette[color]?.dark}>
        {label}
      </Typography>
    </Stack>
  );
}
