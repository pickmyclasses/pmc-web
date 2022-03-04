import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
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

  // TODO: fix this hard coded number
  useEffect(() => {
    fetchCoursesBySearch({ keyword: urlParams['query'], pageSize: 11 }).then(setCourses);
    setCourses(null);
  }, [urlParams]);

  return (
    <>
      <FilterVerticalContainer />
      <ContainerWithStaticScheduler shouldShowScheduler={shouldShowScheduler}>
        <ContainerWithLoadingIndication isLoading={!courses}>
          <Scrollbars autoHide>
            <Stack padding='24px' spacing='16px'>
              <Typography variant='body2' gutterBottom>
                Found {courses?.length} results for <b>"{urlParams.query}"</b>
              </Typography>
              <CourseResultList courses={courses} />
            </Stack>
          </Scrollbars>
        </ContainerWithLoadingIndication>
      </ContainerWithStaticScheduler>
    </>
  );
}
