import {
  AccountBalance,
  AdminPanelSettings,
  EventAvailable,
  ExitToApp,
  ManageAccounts,
  School,
} from '@mui/icons-material';
import { ListItem, Menu, MenuItem, Tab } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { useStyle } from '../NavigationBarButtonGroup';

export default function UserDropDown() {
  const navigate = useNavigate();
  const classes = useStyle();
  const { user, setUser } = useContext(UserContext);

  return (
    <PopupState variant='popover'>
      {(popupState) => (
        <>
          <Tab
            label={user.name}
            icon={<ManageAccounts />}
            className={classes.tab}
            {...bindTrigger(popupState)}
          />
          <Menu
            {...bindMenu(popupState)}
            PaperProps={{
              sx: {
                borderRadius: 0,
                width: '192px',
                backgroundColor: '#182b3a',
                boxShadow: 'none',
              },
            }}
          >
            <MenuItem onClick={popupState.close} className={classes.menuItem}>
              <ListItem className={classes.menuItemIcon}>
                <AdminPanelSettings fontSize='small' />
              </ListItem>
              Profile
            </MenuItem>
            <MenuItem onClick={popupState.close} className={classes.menuItem}>
              <ListItem className={classes.menuItemIcon}>
                <School fontSize='small' />
              </ListItem>
              Capstone
            </MenuItem>
            <MenuItem onClick={popupState.close} className={classes.menuItem}>
              <ListItem className={classes.menuItemIcon}>
                <AccountBalance fontSize='small' />
              </ListItem>
              University
            </MenuItem>
            <MenuItem onClick={popupState.close} className={classes.menuItem}>
              <ListItem className={classes.menuItemIcon}>
                <EventAvailable fontSize='small' />
              </ListItem>
              Schedule
            </MenuItem>
            <MenuItem
              onClick={() => {
                setUser(null);
                navigate('/home');
              }}
              className={classes.menuItem}
            >
              <ListItem className={classes.menuItemIcon}>
                <ExitToApp fontSize='small' />
              </ListItem>
              Log out
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
