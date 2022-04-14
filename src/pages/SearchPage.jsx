import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import CourseResultItem from './../components/CourseCardGrid/CourseResultItem';
import FilterVerticalContainer from '../components/Filter/FilterVerticalContainer';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from 'App';

export default function SearchPage({ shouldShowScheduler }) {
  const { user } = useContext(UserContext);
  const urlParams = useParams();

  const [courses, setCourses] = useState([]);
  const [numResults, setNumResults] = useState(NaN);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const loader = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (loader.current) loader.current.disconnect();
      loader.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((pageNum) => pageNum + 1);
        }
      });
      if (node) loader.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (!urlParams?.query) return;
    setLoading(true);
    fetchCoursesBySearch(urlParams?.query, user?.userID, pageNum).then(({ data, total }) => {
      let newCourses = courses.concat(data);
      setCourses(newCourses);
      setNumResults(total);
      setHasMore(data.length > 0);
      setLoading(false);
    });
  }, [urlParams?.query, pageNum]);

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
              <Stack spacing='24px'>
                {courses?.map((course, i) => {
                  if (courses?.length === i + 1) {
                    return (
                      <div key={i} ref={lastElementRef}>
                        <CourseResultItem course={course} />
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <CourseResultItem course={course} />
                      </div>
                    );
                  }
                })}
              </Stack>
            </Stack>
            {loading && <LinearProgress sx={{ height: 8 }} />}
          </Scrollbars>
        </ContainerWithLoadingIndication>
      </ContainerWithStaticScheduler>
    </>
  );
}
