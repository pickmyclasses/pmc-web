import { Rating, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CenterAligningFlexBox } from './CourseCard';

/** Flexibly shows a rating. */
export default function LabeledRatingDisplay({
  compressed = false,
  noLabel = false,
  size = 'small',
  value = NaN,
  max = 5,
}) {
  const theme = useTheme();

  const textVariant = { small: 'body2', medium: 'body1', large: 'h5' }[size];
  const spacing = { small: '4px', medium: '8px', large: '20px' }[size];

  return (
    <CenterAligningFlexBox>
      {compressed ? (
        <Rating readOnly max={1} value={+(value > 0)} size={size} />
      ) : (
        <Rating readOnly max={max} value={value} precision={0.5} size={size} />
      )}
      {!noLabel && (
        <Stack alignItems='center' marginLeft={spacing}>
          <Typography
            variant={textVariant}
            color={size !== 'large' && theme.palette.text.secondary}
          >
            {value ? value.toFixed(1) : 'N/A'}
          </Typography>
          {size === 'large' && <Typography variant='body2'>out of 5</Typography>}
        </Stack>
      )}
    </CenterAligningFlexBox>
  );
}
