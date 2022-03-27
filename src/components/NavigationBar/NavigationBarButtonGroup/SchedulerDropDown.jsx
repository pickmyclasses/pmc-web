import { EventNote } from '@mui/icons-material';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import React from 'react';
import { ButtonGroupTab } from '../NavigationBarButtonGroup';

export default function SchedulerDropDown() {
  // Update 03/20/22: static scheduler in home page and search page always shows.
  // const { hasStaticScheduler, shouldShowStaticScheduler, setShouldShowStaticScheduler } =
  //   useContext(NavigationBarContext);

  // const handleTabClick = () => {
  // if (hasStaticScheduler) setShouldShowStaticScheduler(!shouldShowStaticScheduler);
  // };

  // Update 03/27/22: this scheduler button always links to the schedule detail page.
  // return (
  //   <PopupState variant='popover'>
  //     {(popupState) => (
  //       <>
  //         <ButtonGroupTab label='Schedule' icon={<EventNote />} {...bindTrigger(popupState)} />
  //         <Menu
  //           {...bindMenu(popupState)}
  //           sx={{ '> *': { overflow: 'visible' } }}
  //           PaperProps={{
  //             sx: {
  //               overflow: 'visible',
  //               width: '360px',
  //               height: '792px',
  //               '> *': { padding: '20px !important', height: 'calc(100% - 40px)' },
  //             },
  //           }}
  //         >
  //           <Scheduler />
  //         </Menu>
  //       </>
  //     )}
  //   </PopupState>
  // );

  return (
    <ButtonGroupTab
      label='Schedule'
      icon={<EventNote />}
      component={PreventableLink}
      to='/profile/schedule'
    />
  );
}
