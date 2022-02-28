import { Typography, useTheme } from '@mui/material';
import React, { createElement } from 'react';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';

export default function LabelWithIcon({ color, iconType, label }) {
  const theme = useTheme();

  return (
    <CenterAligningFlexBox>
      {createElement(iconType, { color, fontSize: 'small', sx: { marginRight: '8px' } })}
      <Typography variant='body1' color={theme.palette[color].dark}>
        {label}
      </Typography>
    </CenterAligningFlexBox>
  );
}
