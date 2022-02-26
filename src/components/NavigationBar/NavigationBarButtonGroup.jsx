import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, useTheme, Tab, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { UserContext } from '../../App';
import SchedulerDropDown from './NavigationBarButtonGroup/SchedulerDropDown';
import UserDropDown from './NavigationBarButtonGroup/UserDropDown';
import { Dashboard, NotificationAdd } from '@mui/icons-material';

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup() {
  const theme = useTheme();
  const classes = useStyle();

  const { user } = useContext(UserContext);

  const renderTabsForLoggedIn = () => [
    <SchedulerDropDown key='scheduler' />,
    <Tab
      key='notification'
      label='Notification'
      icon={<NotificationAdd />}
      className={classes.tab}
    />,
    <Tab key='discussion' label='Discussion' icon={<Dashboard />} className={classes.tab} />,
    <UserDropDown key='user' />,
  ];

  const renderTabsForNotLoggedIn = () => [
    <Button
      key='login'
      variant='contained'
      component={Link}
      to='/auth'
      className={classes.button}
    >
      Login
    </Button>,
  ];

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
      {user == null ? renderTabsForNotLoggedIn() : renderTabsForLoggedIn()}
    </Grid>
  );
}

// TODO Q: Replace these marginTops with a flex parent whose vertical align is set to middle.
export const useStyle = makeStyles({
  tab: {
    color: 'white',
    marginTop: '5%',
    fontSize: '15%',
  },
  menuItem: {
    fontSize: '0.9em',
    color: '#d4d6d9',
  },
  menuItemIcon: {
    color: '#d4d6d9',
  },
  button: {
    marginTop: '30%',
    color: '#d4d6d9',
  },
});
