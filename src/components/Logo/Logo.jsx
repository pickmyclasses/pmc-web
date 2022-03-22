import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { School } from '@material-ui/icons';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';

/** A clickable website logo that links to home page. */
export default function Logo() {
  const theme = useTheme();

  return (
    <Stack
      direction='row'
      alignItems='center'
      component={PreventableLink}
      to='/'
      color={theme.palette.primary.contrastText}
      sx={{ textDecoration: 'none' }}
    >
      <School style={{ marginRight: '12px' }} />
      <Typography variant='h6' fontWeight='500'>
        PickMyClasses
      </Typography>
    </Stack>
  );
}
