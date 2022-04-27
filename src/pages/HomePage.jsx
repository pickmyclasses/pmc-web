import React, { useContext, useEffect, useState } from 'react';
import { fetchHomePageCourses } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import ClickableIndicator from '../components/CourseCardGrid/CourseCard/ClickableIndicator';
import { Box, Divider, Typography, colors, Link, Stack } from '@mui/material';
import { NavigationBarContext } from '../components/NavigationBar/ContainerWithNavigationBar';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from 'App';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { ReactComponent as Welcome } from '../assets/welcome.svg';

export default function HomePage() {
  const { user } = useContext(UserContext);
  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [courseCategories, setCourseCategories] = useState(null);

  useEffect(() => user && fetchHomePageCourses(user).then(setCourseCategories), [user]);

  return (
    <ContainerWithStaticScheduler>
      <ContainerWithLoadingIndication isLoading={!courseCategories}>
        <Scrollbars autoHide>
          <Stack padding='32px 20px 12px 0' spacing='12px'>
            <Box
              sx={{
                height: '7em',
                bgcolor: '#397c9e',
                borderRadius: '10px',
                color: 'white',
                fontStyle: 'bold',
              }}
            >
              
              <Typography variant='h5' sx={{ textAlign: 'center', marginTop: '0.7em' }}>
                Welcome to your personal PMC! 🎉
              </Typography>
              <Typography variant='h5' sx={{ textAlign: 'center', marginTop: '0.3em' }}>
                Check out the courses we picked for you!
              </Typography>
            </Box>
            {courseCategories &&
              courseCategories.map(({ directCourseSetName, courseList }, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ marginY: '8px' }} />}
                  <ClickableIndicator>
                    {/* TODO Q: This link should link to roadmap and scroll to the
                     *  corresponding section */}
                    <Link component={PreventableLink} to='/profile/roadmap' underline='none'>
                      <SectionOverline>{directCourseSetName}</SectionOverline>
                    </Link>
                  </ClickableIndicator>
                  <Box sx={{ padding: '8px 0 16px 0' }}>
                    <CourseCardGrid
                      key={i}
                      title={directCourseSetName}
                      courses={courseList}
                      numColumns={shouldShowStaticScheduler ? 4 : 5}
                    />
                  </Box>
                </Box>
              ))}
          </Stack>
        </Scrollbars>
      </ContainerWithLoadingIndication>
    </ContainerWithStaticScheduler>
  );
}

export const SectionOverline = ({ children, ...props }) => (
  <Typography {...props} variant='overline' fontSize='medium' color={colors.grey[900]}>
    {children}
  </Typography>
);
