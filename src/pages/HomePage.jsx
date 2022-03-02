import React, { useContext, useState } from 'react';
import { fetchHomePageCourses } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import { useMount } from '../utils';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import ClickableIndicator from '../components/CourseCardGrid/CourseCard/ClickableIndicator';
import { Box, Divider, Typography } from '@mui/material';
import { NavigationBarContext } from '../components/NavigationBar/ContainerWithNavigationBar';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';

export default function HomePage() {
  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [courseCategories, setCourseCategories] = useState(null);

  useMount(() => fetchHomePageCourses().then(setCourseCategories));

  return (
    <ContainerWithStaticScheduler>
      <ContainerWithLoadingIndication isLoading={!courseCategories}>
        <Scrollbars autoHide>
          <Box padding='32px'>
            {courseCategories &&
              courseCategories.map(({ category, courses }, i) => (
                <Box key={i}>
                  {i > 0 && <Divider sx={{ marginY: '8px' }} />}
                  <ClickableIndicator>
                    <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
                      {category}
                    </Typography>
                  </ClickableIndicator>
                  <Box sx={{ padding: '8px 0 16px 0' }}>
                    <CourseCardGrid
                      key={i}
                      title={category}
                      courses={courses}
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
