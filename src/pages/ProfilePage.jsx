import { Dashboard, EventNote, PlaylistAdd, School } from '@mui/icons-material';
import { Box, Container, Divider, Grid, Stack, styled, Tab, Tabs } from '@mui/material';
import { UserContext } from '../App';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import PreventableLink from '../components/PreventableNavigation/PreventableLink';
import ProfileAvatarDisplay from '../components/ProfilePage/ProfileAvatarDisplay';
import ProfileRoadmap from '../components/ProfilePage/ProfileRoadmap';
import ProfileSchedule from '../components/ProfilePage/ProfileSchedule';
import React, { createElement, useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useParams } from 'react-router-dom';

/**
 * Provides the basic layout and tab management for the user profile page (accessed via avatar
 * in nav-bar -> profile).
 */
export default function ProfilePage() {
  const urlParams = useParams();
  const { user } = useContext(UserContext);

  /** The name of the active tab as given in the URL's `:tab` parameter. */
  const [activeTabName, setActiveTabName] = useState('');

  // Figure out the active tab from the URL.
  useEffect(() => {
    const tabParam = String(urlParams.tab).toLowerCase();
    setActiveTabName(tabs.hasOwnProperty(tabParam) ? tabParam : '');
  }, [urlParams]);

  /** Renders a tab button. */
  const renderTab = (name, title, icon) => (
    <Tab
      key={name}
      value={name}
      iconPosition='start'
      icon={createElement(icon)}
      label={title}
      component={PreventableLink}
      to={'/profile/' + name}
      sx={{
        textDecoration: 'none',
        justifyContent: 'flex-start',
        '> svg': { marginLeft: '32px', marginRight: '24px !important' },
      }}
    />
  );

  return (
    <ContainerWithLoadingIndication isLoading={!user}>
      <Container maxWidth='xl' sx={{ paddingBottom: '32px', height: '100%' }}>
        <Grid container spacing='32px' height='100%'>
          {/* The left bar (that contains the avatar and tab list): */}
          <LeftBarGridItem item xs='auto' height='100%' sx={{ boxShadow: 3 }}>
            <Stack width='240px' spacing='24px' paddingRight='32px'>
              <ProfileAvatarDisplay />
              <Divider />
            </Stack>
            <Tabs orientation='vertical' variant='fullWidth' value={activeTabName}>
              {Object.entries(tabs).map(([name, { title, icon }]) =>
                renderTab(name, title, icon)
              )}
            </Tabs>
          </LeftBarGridItem>
          {/* The active tab's content: */}
          <Grid item xs sx={{ marginLeft: '272px' }}>
            <Scrollbars autoHide style={{ height: 'calc(100vh - 72px)' }}>
              <Box padding='32px'>{createElement(tabs[activeTabName].content)}</Box>
            </Scrollbars>
          </Grid>
        </Grid>
      </Container>
    </ContainerWithLoadingIndication>
  );
}

/**
 * The list of tabs in the profile page, defined in the format of `name: {title, icon}`, where
 * `name` also determines the `:tab` parameter in the URL.
 */
const tabs = {
  '': { title: 'Dashboard', icon: Dashboard, content: ProfileRoadmap },
  'schedule': { title: 'Schedule', icon: EventNote, content: ProfileSchedule },
  'roadmap': { title: 'Roadmap', icon: School, content: ProfileRoadmap },
  'history': { title: 'History', icon: PlaylistAdd, content: ProfileRoadmap },
};

// The following provides shadow style settings for the left bar of the page.

const leftBarLeftShadowWidth = 128;

const LeftBarGridItem = styled(Grid)({
  backgroundColor: 'white',
  position: 'absolute',
  marginTop: '32px',
  zIndex: 9997,
  // The left shadow of the left bar is a gradient from white, and this is achieved with an
  // inner shadow on the :before element. (Credit: https://stackoverflow.com/a/17323375)
  '&:before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    height: '100%',
    zIndex: 9998,
    width: leftBarLeftShadowWidth * 2 + 'px',
    boxShadow: `${
      -2 * leftBarLeftShadowWidth
    }px 0 ${leftBarLeftShadowWidth}px ${-leftBarLeftShadowWidth}px inset white`,
    left: -2 * leftBarLeftShadowWidth + 'px',
  },
});
