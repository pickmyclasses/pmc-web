import React, { useContext } from 'react';
import { Grid, Tab, Button, styled, ThemeProvider } from '@mui/material';
import { UserContext } from '../../App';
import { navigationBarTheme } from './NavigationBar';
import SchedulerDropDown from './NavigationBarButtonGroup/SchedulerDropDown';
import UserDropDown from './NavigationBarButtonGroup/UserDropDown';
import { NotificationAdd } from '@mui/icons-material';
import { useMount } from '../../utils';
import LinkToAuthForm from 'components/AuthForm/LinkToAuthForm';

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup() {
  const { user, setUser } = useContext(UserContext);

  useMount(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
    else setUser(null);
  });

  const renderTabsForLoggedIn = () => [
    <SchedulerDropDown key='scheduler' />,
    <ButtonGroupTab key='notification' label='Notification' icon={<NotificationAdd />} />,
    <UserDropDown key='user' />,
  ];

  const renderTabsForNotLoggedIn = () => [
    <Button key='login' variant='contained' component={LinkToAuthForm}>
      Login
    </Button>,
  ];

  return (
    <ThemeProvider theme={navigationBarTheme}>
      <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap !important' }}>
        {user == null ? renderTabsForNotLoggedIn() : renderTabsForLoggedIn()}
      </Grid>
    </ThemeProvider>
  );
}

export const ButtonGroupTab = styled(Tab)({
  fontSize: '11px',
  fontVariant: 'all-small-caps',
});
