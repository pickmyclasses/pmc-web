import { EventNote } from '@mui/icons-material';
import { Menu } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { useContext } from 'react';
import Scheduler from '../../Scheduler/Scheduler';
import { NavigationBarContext } from '../ContainerWithNavigationBar';
import { ButtonGroupTab } from '../NavigationBarButtonGroup';

export default function SchedulerDropDown() {
  // Update 03/20/22: static scheduler in home page and search page always shows.
  // const { hasStaticScheduler, shouldShowStaticScheduler, setShouldShowStaticScheduler } =
  //   useContext(NavigationBarContext);

  // const handleTabClick = () => {
  // if (hasStaticScheduler) setShouldShowStaticScheduler(!shouldShowStaticScheduler);
  // };

  return (
    <PopupState variant='popover'>
      {(popupState) => (
        <>
          <ButtonGroupTab label='Schedule' icon={<EventNote />} {...bindTrigger(popupState)} />
          <Menu
            {...bindMenu(popupState)}
            sx={{ '> *': { overflow: 'visible' } }}
            PaperProps={{
              sx: {
                overflow: 'visible',
                width: '360px',
                height: '792px',
                '> *': { padding: '20px !important', height: 'calc(100% - 40px)' },
              },
            }}
          >
            <Scheduler />
          </Menu>
        </>
      )}
    </PopupState>
  );
}
