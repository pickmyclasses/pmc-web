import {
  AccountCircle,
  EventNote,
  ExitToApp,
  History,
  Person,
  School,
} from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
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
      divider: true,
      props: { component: PreventableLink, to: '/profile/history' },
    },
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
            PaperProps={{ sx: { width: '256px' } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuItems.map(({ icon, text, handleClick, divider, props }, i) =>
              [
                <MenuItem
                  key={i}
                  onClick={handleClick || popupState.close}
                  sx={{ height: '48px' }}
                  {...props}
                >
                  <ListItemIcon sx={{ marginLeft: '8px' }}>{createElement(icon)}</ListItemIcon>
                  <ListItemText sx={{ marginLeft: '16px' }}>{text}</ListItemText>
                </MenuItem>,
                divider && <Divider key={i + '-divider'} />,
              ].filter(Boolean)
            )}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
