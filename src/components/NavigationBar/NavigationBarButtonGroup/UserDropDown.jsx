import {
  AccountBalance,
  AdminPanelSettings,
  ExitToApp,
  ManageAccounts,
  School,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import React, { useContext, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { ButtonGroupTab } from '../NavigationBarButtonGroup';

export default function UserDropDown() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogOutMenuItemClick = () => {
    setUser(null);
    navigate('/home');
  };

  const menuItems = [
    { icon: AdminPanelSettings, text: 'Profile' },
    { icon: School, text: 'Capstone' },
    { icon: AccountBalance, text: 'My university', props: { divider: true } },
    { icon: ExitToApp, text: 'Log out', handleClick: handleLogOutMenuItemClick },
  ];

  return (
    <PopupState variant='popover'>
      {(popupState) => (
        <>
          <ButtonGroupTab
            label={user.name}
            icon={<ManageAccounts />}
            {...bindTrigger(popupState)}
          />
          <Menu
            {...bindMenu(popupState)}
            disableScrollLock
            PaperProps={{ sx: { width: '240px' } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuItems.map(({ icon, text, handleClick, props }, i) => (
              <MenuItem
                key={i}
                onClick={handleClick || popupState.close}
                sx={{ height: '48px' }}
                {...props}
              >
                <ListItemIcon>{createElement(icon)}</ListItemIcon>
                <ListItemText sx={{ marginLeft: '8px' }}>{text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
