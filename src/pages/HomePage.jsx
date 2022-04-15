import React, { useContext, useEffect, useState } from 'react';
import { fetchHomePageCourses } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import ClickableIndicator from '../components/CourseCardGrid/CourseCard/ClickableIndicator';
import { Box, Divider, Typography, colors } from '@mui/material';
import { NavigationBarContext } from '../components/NavigationBar/ContainerWithNavigationBar';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from 'App';

export default function HomePage() {
  const { user } = useContext(UserContext);
  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [courseCategories, setCourseCategories] = useState(null);

  useEffect(() => user && fetchHomePageCourses(user.userID).then(setCourseCategories), [user]);

  return (
    <ContainerWithStaticScheduler>
      <ContainerWithLoadingIndication isLoading={!courseCategories}>
        <Scrollbars autoHide>
          <Box padding='32px'>
            {courseCategories &&
              courseCategories.map(({ directCourseSetName, courseList }, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ marginY: '8px' }} />}
                  <ClickableIndicator>
                    <SectionOverline>{directCourseSetName}</SectionOverline>
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
          </Box>
        </Scrollbars>
      </ContainerWithLoadingIndication>
    </ContainerWithStaticScheduler>
  );
}

export const SectionOverline = ({ children, ...props }) => (
  <Typography {...props} variant='overline' fontSize='medium' color={colors.grey[600]}>
    {children}
  </Typography>
);
