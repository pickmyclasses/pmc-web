import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tab, Button, styled, ThemeProvider } from '@mui/material';
import { UserContext } from '../../App';
import { navigationBarTheme } from './NavigationBar';
import SchedulerDropDown from './NavigationBarButtonGroup/SchedulerDropDown';
import UserDropDown from './NavigationBarButtonGroup/UserDropDown';
import { Dashboard, NotificationAdd } from '@mui/icons-material';

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup() {
  const { user } = useContext(UserContext);

  const renderTabsForLoggedIn = () => [
    <SchedulerDropDown key='scheduler' />,
    <ButtonGroupTab key='notification' label='Notification' icon={<NotificationAdd />} />,
    <ButtonGroupTab key='discussion' label='Discussion' icon={<Dashboard />} />,
    <UserDropDown key='user' />,
  ];

  const renderTabsForNotLoggedIn = () => [
    <SchedulerDropDown key='scheduler' />,
    <Button key='login' variant='contained' component={Link} to='/auth'>
      Login
    </Button>,
  ];

  return (
    <ThemeProvider theme={navigationBarTheme}>
      <Grid
        container
        sx={{
          alignItems: 'center',
          flexWrap: 'nowrap !important',
        }}
      >
        {user == null ? renderTabsForNotLoggedIn() : renderTabsForLoggedIn()}
      </Grid>
    </ThemeProvider>
  );
}

export const ButtonGroupTab = styled(Tab)({ fontSize: 'xx-small' });
