import React from 'react';
import { Stack, useTheme } from '@mui/material';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import heading from '../../assets/pmc.png';
import logo from '../../assets/icon.png';

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
      <img src={logo} alt={logo} style={{ height: '35px', marginRight: '10px' }} />
      <img src={heading} alt={'PickMyClasses'} style={{ height: '30px' }} />
    </Stack>
  );
}
