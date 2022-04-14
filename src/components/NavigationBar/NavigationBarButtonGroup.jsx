import React, { useContext } from 'react';
import { Grid, Tab, Button, styled, ThemeProvider } from '@mui/material';
import { UserContext } from '../../App';
import { navigationBarTheme } from './NavigationBar';
import SchedulerDropDown from './NavigationBarButtonGroup/SchedulerDropDown';
import UserDropDown from './NavigationBarButtonGroup/UserDropDown';
import { School } from '@mui/icons-material';
import { useMount } from '../../utils';
import LinkToAuthForm from 'components/AuthForm/LinkToAuthForm';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup() {
  const { user } = useContext(UserContext);

  const renderTabsForLoggedIn = () => [
    <SchedulerDropDown key='scheduler' />,
    <ButtonGroupTab
      key='roadmap'
      label='Roadmap'
      icon={<School />}
      component={PreventableLink}
      to='/profile/roadmap'
    />,
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
