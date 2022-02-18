import React from 'react';
import { Button, Typography, useTheme } from '@mui/material';

export default function TimeBlock({
  text,
  variant = 'outlined',
  color = 'primary',
  darken = false,
  gray = false,
  data,
  sx = {},
  ...props
}) {
  const theme = useTheme();

  const buttonStyles = {
    ...sx,
    width: '100%',
    minWidth: 0,
    height: '100%',
    boxShadow: 1,
    borderWidth: '2px !important',
    borderRadius: '0px',
    borderColor:
      (!gray
        ? theme.palette[color][darken ? 'main' : 'light']
        : theme.palette.grey[darken ? 600 : 400]) + ' !important',
    color:
      (!gray ? '' : darken ? theme.palette.text.primary : theme.palette.grey[800]) +
      ' !important',
    backgroundColor:
      (variant === 'contained'
        ? theme.palette[color][darken ? 'dark' : 'main']
        : darken
        ? theme.palette.grey[200]
        : theme.palette.background.default) + ' !important',
    wordSpacing: '100vw',
    alignItems: 'flex-start',
    overflow: 'hidden',
  };

  const textStyles = {
    pointerEvents: 'none',
    fontSize: 'min(14px, 1.5vmin)',
  };

  return (
    <Button text={text} variant={variant} color={color} sx={buttonStyles} {...props}>
      <Typography variant='subtitle2' lineHeight={1.19} style={textStyles}>
        {text}
      </Typography>
    </Button>
  );
}
