import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import PageWithScheduler from './PageWithScheduler';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import { useMount } from '../utils';

export default function SearchPage({ shouldShowScheduler }) {
  const [courseIDs, setCourseIDs] = useState(null);

  const urlParams = useParams();

  useMount(() => {
    fetchCoursesBySearch(urlParams['query']).then((data) => setCourseIDs(data));
  });

  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      {courseIDs ? (
        <>
          <div style={{ margin: '24px 0 16px' }}>
            Found {courseIDs.length} results for <b>"{urlParams['query']}"</b>
          </div>
          <CourseCardGrid numColumns={shouldShowScheduler ? 3 : 4} courseIDs={courseIDs} />
        </>
      ) : (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      )}
    </PageWithScheduler>
  );
}
