import { EventNote } from '@mui/icons-material';
import { Menu, Tab } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { useContext } from 'react';
import Scheduler from '../../Scheduler/Scheduler';
import { NavigationBarContext } from '../ContainerWithNavigationBar';
import { useStyle } from '../NavigationBarButtonGroup';

export default function SchedulerDropDown() {
  const classes = useStyle();
  const { hasStaticScheduler, shouldShowStaticScheduler, setShouldShowStaticScheduler } =
    useContext(NavigationBarContext);

  return (
    <PopupState variant='popover'>
      {(popupState) => (
        <>
          <Tab
            label='Schedule'
            icon={<EventNote />}
            className={classes.tab}
            onClick={() =>
              hasStaticScheduler && setShouldShowStaticScheduler(!shouldShowStaticScheduler)
            }
            {...(!hasStaticScheduler && bindTrigger(popupState))}
          />
          <Menu
            {...bindMenu(popupState)}
            sx={{ '> *': { overflow: 'visible' } }}
            PaperProps={{
              sx: {
                overflow: 'visible',
                width: '360px',
                height: '720px',
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
