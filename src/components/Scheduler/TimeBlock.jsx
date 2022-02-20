import React, { useEffect, useState } from 'react';
import { Button, Typography, useTheme } from '@mui/material';
import Color from 'color';

export default function TimeBlock({
  text,
  variant = 'outlined',
  color = 'gray',
  darken = false,
  data,
  sx = {},
  ...props
}) {
  const theme = useTheme();

  const [palette, setPalette] = useState({ backgroundColor: '', borderColor: '', color: '' });

  useEffect(() => {
    const mainColor = Color(
      color === 'gray' ? theme.palette.grey[500] : theme.palette[color]?.main || color
    );
    let shades = [mainColor.lighten(0.25).string(), mainColor.string()];

    const outlinedBackgroundColors = [
      theme.palette.background.default,
      theme.palette.grey[300],
    ];

    setPalette({
      backgroundColor:
        variant === 'outlined' ? outlinedBackgroundColors[+darken] : shades[+darken],
      borderColor: shades[+darken],
      color: variant === 'outlined' ? shades[+darken] : '',
    });
  }, [theme, variant, color, darken]);

  const buttonStyles = {
    ...sx,
    width: '100%',
    minWidth: 0,
    height: '100%',
    boxShadow: 1,
    borderWidth: '2px !important',
    borderRadius: '0px',
    wordSpacing: '100vw',
    alignItems: 'flex-start',
    overflow: 'hidden',
    '&, &:hover, &:focus': { ...palette },
  };

  const textStyles = {
    pointerEvents: 'none',
    fontSize: 'min(14px, 1.5vmin)',
  };

  return (
    <Button text={text} variant={variant} color='primary' sx={buttonStyles} {...props}>
      <Typography variant='subtitle2' lineHeight={1.19} style={textStyles}>
        {text}
      </Typography>
    </Button>
  );
}
