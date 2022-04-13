import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import CourseResultList from '../components/CourseCardGrid/CourseResultList';
import FilterVerticalContainer from '../components/Filter/FilterVerticalContainer';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from 'App';

export default function SearchPage({ shouldShowScheduler }) {
  const { user } = useContext(UserContext);
  const urlParams = useParams();

  const [courses, setCourses] = useState(null);
  const [numResults, setNumResults] = useState(NaN);

  // TODO: fix this hard coded number
  useEffect(() => {
    if (!urlParams?.query) return;
    fetchCoursesBySearch(urlParams.query, user?.userID).then(({ data, total }) => {
      setCourses(data);
      setNumResults(total);
    });
    setCourses(null);
  }, [urlParams?.query]);

  return (
    <>
      <FilterVerticalContainer />
      <ContainerWithStaticScheduler shouldShowScheduler={shouldShowScheduler}>
        <ContainerWithLoadingIndication isLoading={!courses}>
          <Scrollbars autoHide>
            <Stack padding='24px' spacing='16px'>
              <Typography variant='body2' gutterBottom>
                Found {numResults} results for <b>"{urlParams.query}"</b>
              </Typography>
              <CourseResultList courses={courses} />
            </Stack>
          </Scrollbars>
        </ContainerWithLoadingIndication>
      </ContainerWithStaticScheduler>
    </>
  );
}
