import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Grid, IconButton, Tooltip, styled, useTheme } from '@mui/material';
import { Logout, Notifications, ShoppingCart } from '@mui/icons-material';

const LargeIconButton = styled(IconButton)({ svg: { transform: 'scale(1.25)' } });

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup({
  isSchedulerShowing,
  toggleScheduler,
  userData,
  logout,
}) {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing='16px'
      sx={{
        alignItems: 'center',
        flexWrap: 'nowrap !important',
        '*': { color: theme.palette.primary.contrastText },
      }}
    >
      {userData
        ? renderItemsForLoggedIn(isSchedulerShowing, toggleScheduler, userData, logout)
        : renderItemsForNotLoggedIn(isSchedulerShowing, toggleScheduler)}
    </Grid>
  );
}

const renderItemsForLoggedIn = (isSchedulerShowing, toggleScheduler, userData, logout) => (
  <>
    <Grid item>
      <LargeIconButton>
        <Avatar sx={{ backgroundColor: '#222' }}>{getInitialsFromName(userData.name)}</Avatar>
      </LargeIconButton>
    </Grid>
    {renderToggleSchedulerButton(isSchedulerShowing, toggleScheduler)}
    <Grid item>
      <Tooltip title='Notifications' disableInteractive>
        <LargeIconButton size='large'>
          <Notifications />
        </LargeIconButton>
      </Tooltip>
    </Grid>
    <Grid item>
      <Tooltip title='Log Out' disableInteractive>
        <LargeIconButton size='large' onClick={logout}>
          <Logout />
        </LargeIconButton>
      </Tooltip>
    </Grid>
  </>
);

const renderItemsForNotLoggedIn = (isSchedulerShowing, toggleScheduler) => (
  <>
    {renderToggleSchedulerButton(isSchedulerShowing, toggleScheduler)}
    <Grid item>
      <Button component={Link} to='/auth' variant='contained'>
        Login
      </Button>
    </Grid>
  </>
);

const getInitialsFromName = (name) => name.split(' ').map((token) => token[0].toUpperCase());

const renderToggleSchedulerButton = (isSchedulerShowing, toggleScheduler) => (
  <Grid item>
    <Tooltip title={`${isSchedulerShowing ? 'Hide' : 'Show'} Shopping Cart`} disableInteractive>
      <LargeIconButton size='large' onClick={toggleScheduler}>
        <ShoppingCart />
      </LargeIconButton>
    </Tooltip>
  </Grid>
);
