import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import { useMount } from '../utils';
import CourseResultList from '../components/CourseCardGrid/CourseResultList';
import FilterVerticalContainer from '../components/Filter/FilterVerticalContainer';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';

export default function SearchPage({ shouldShowScheduler }) {
  const [courses, setCourses] = useState(null);

  const urlParams = useParams();

  useMount(() => fetchCoursesBySearch(urlParams['query']).then(setCourses));

  return (
    <>
      <FilterVerticalContainer />
      <ContainerWithStaticScheduler shouldShowScheduler={shouldShowScheduler}>
        <ContainerWithLoadingIndication isLoading={!courses}>
          <Scrollbars autoHide>
            <Box sx={{ padding: '24px' }}>
              <Typography variant='subtitle2' gutterBottom>
                Found {courses?.length} results for <b>"{urlParams.query}"</b>
              </Typography>
              <CourseResultList courses={courses} />
            </Box>
          </Scrollbars>
        </ContainerWithLoadingIndication>
      </ContainerWithStaticScheduler>
    </>
  );
}
