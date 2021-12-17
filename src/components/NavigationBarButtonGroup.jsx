import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Grid, IconButton, styled, useTheme } from '@mui/material';
import { Notifications, Logout } from '@mui/icons-material';

const LargeIconButton = styled(IconButton)({ svg: { transform: 'scale(1.25)' } });

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup({ userData, logout }) {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing='16px'
      sx={{
        flexWrap: 'nowrap !important',
        '*': { color: theme.palette.primary.contrastText },
      }}
    >
      {userData ? renderItemsForLoggedIn(userData, logout) : renderItemsForNotLoggedIn()}
    </Grid>
  );
}

const renderItemsForLoggedIn = (userData, logout) => (
  <>
    <Grid item>
      <LargeIconButton>
        <Avatar sx={{ backgroundColor: '#222' }}>{getInitialsFromName(userData.name)}</Avatar>
      </LargeIconButton>
    </Grid>
    <Grid item>
      <LargeIconButton size='large'>
        <Notifications />
      </LargeIconButton>
    </Grid>
    <Grid item>
      <LargeIconButton size='large' onClick={logout}>
        <Logout />
      </LargeIconButton>
    </Grid>
  </>
);

const renderItemsForNotLoggedIn = () => (
  <Grid item>
    <Button component={Link} to='/auth' variant='contained'>
      Login
    </Button>
  </Grid>
);

const getInitialsFromName = (name) => name.split(' ').map((token) => token[0].toUpperCase());
