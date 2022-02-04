import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, useTheme, Tabs, Tab, ListItemIcon, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';
import { UserContext } from '../../App';

// TODO Q: Replace these marginTops with a flex parent whose vertical align is set to middle.
const useStyle = makeStyles({
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

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup({ toggleScheduler, logout }) {
  const theme = useTheme();
  const classes = useStyle();

  const { user } = useContext(UserContext);
  const isUserLoggedIn = user != null;

  const renderTabsForLoggedIn = () => [
    <Tab
      key='schedule'
      label='Schedule'
      icon={<EventNoteIcon />}
      className={classes.tab}
      onClick={toggleScheduler}
    />,
    <Tab
      key='notification'
      label='Notification'
      icon={<NotificationAddIcon />}
      className={classes.tab}
    />,
    <Tab
      key='discussion'
      label='Discussion'
      icon={<DashboardIcon />}
      className={classes.tab}
    />,
    <UserDropDownList key='user-drop-down-list' user={user} logout={logout} />,
  ];

  const renderTabsForNotLoggedIn = () => <LoginButton />;

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
      <Tabs value={false} aria-label='nav tabs example'>
        {isUserLoggedIn ? renderTabsForLoggedIn() : renderTabsForNotLoggedIn()}
      </Tabs>
    </Grid>
  );
}

const LoginButton = () => {
  const classes = useStyle();
  return (
    <>
      <Button variant='contained' component={Link} to='/auth' className={classes.button}>
        Login
      </Button>
    </>
  );
};

const UserDropDownList = ({ user, logout }) => {
  const classes = useStyle();
  return (
    <>
      <PopupState variant='popover'>
        {(popupState) => (
          <React.Fragment>
            <Tab
              label={user.name}
              icon={<ManageAccountsIcon />}
              className={classes.tab}
              {...bindTrigger(popupState)}
            />
            <Menu
              {...bindMenu(popupState)}
              PaperProps={{
                sx: {
                  borderRadius: 0,
                  width: 135,
                  bgcolor: '#182b3a',
                  boxShadow: 'none',
                },
              }}
            >
              <MenuItem onClick={popupState.close} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <AdminPanelSettingsIcon fontSize='small' />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={popupState.close} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <SchoolIcon fontSize='small' />
                </ListItemIcon>
                Capstone
              </MenuItem>
              <MenuItem onClick={popupState.close} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <AccountBalanceIcon fontSize='small' />
                </ListItemIcon>
                University
              </MenuItem>
              <MenuItem onClick={popupState.close} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <EventAvailableIcon fontSize='small' />
                </ListItemIcon>
                Schedule
              </MenuItem>
              <MenuItem onClick={logout} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <ExitToAppIcon fontSize='small' />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </>
  );
};
