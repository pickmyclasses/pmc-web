import {
  AccountBalance,
  AccountCircle,
  EventNote,
  ExitToApp,
  Groups,
  History,
  Person,
  School,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
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
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    {
      icon: Person,
      text: 'Profile',
      props: { component: PreventableLink, to: '/profile' },
    },
    {
      icon: EventNote,
      text: 'Schedule',
      props: { component: PreventableLink, to: '/profile/schedule' },
    },
    {
      icon: School,
      text: 'Roadmap',
      props: { component: PreventableLink, to: '/profile/roadmap' },
    },
    {
      icon: History,
      text: 'History',
      props: { component: PreventableLink, to: '/profile/history', divider: true },
    },
    { icon: Groups, text: 'Discussion Board' },
    { icon: AccountBalance, text: 'My University', props: { divider: true } },
    { icon: ExitToApp, text: 'Log out', handleClick: handleLogOutMenuItemClick },
  ];

  return (
    <PopupState variant='popover'>
      {(popupState) => (
        <>
          <ButtonGroupTab
            label={user.name}
            icon={<AccountCircle />}
            {...bindTrigger(popupState)}
          />
          <Menu
            {...bindMenu(popupState)}
            disableScrollLock
            PaperProps={{ sx: { width: '288px' } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuItems.map(({ icon, text, handleClick, props }, i) => (
              <MenuItem
                key={i}
                onClick={handleClick || popupState.close}
                sx={{ height: '56px' }}
                {...props}
              >
                <ListItemIcon sx={{ marginLeft: '8px' }}>{createElement(icon)}</ListItemIcon>
                <ListItemText sx={{ marginLeft: '16px' }}>{text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
