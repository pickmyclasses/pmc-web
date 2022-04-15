import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  createContext,
} from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { fetchCoursesBySearch } from '../api';
import ContainerWithStaticScheduler from '../components/Scheduler/ContainerWithStaticScheduler';
import CourseResultItem from './../components/CourseCardGrid/CourseResultItem';
import FilterGroup from '../components/Filter/FilterGroup';
import Scrollbars from 'react-custom-scrollbars-2';
import ContainerWithLoadingIndication from '../components/Page/ContainerWithLoadingIndication';
import { UserContext } from 'App';
import Lottie from 'react-lottie-player';
import emptyResult from '../assets/empty-box.json';

export const FilterContext = createContext();

export default function SearchPage({ shouldShowScheduler }) {
  const { user } = useContext(UserContext);
  const urlParams = useParams();

  const [courses, setCourses] = useState([]);
  const [numResults, setNumResults] = useState(NaN);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const [noOffering, setNoOffering] = useState(false);
  const [onlineOffering, setOnlineOffering] = useState(false);
  const [weekdays, setWeekdays] = useState('');
  const [startTime, setStartTimeClock] = useState('');
  const [endTime, setEndTimeClock] = useState('');

  const loader = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (loader.current) loader.current.disconnect();
      loader.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageIndex((pageIndex) => pageIndex + 1);
        }
      });
      if (node) loader.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setCourses([]);
    if (!urlParams?.query) return;
    setPageIndex(0);
    let dateStr = convertDateToStr(weekdays);
    let startTimeF = convertTimeToFloat(startTime);
    let endTimeF = convertTimeToFloat(endTime);
    fetchCoursesBySearch(
      urlParams?.query,
      user,
      pageIndex,
      30,
      noOffering,
      onlineOffering,
      dateStr,
      startTimeF,
      endTimeF
    ).then(({ data, total }) => {
      setCourses(data);
      setNumResults(total);
    });
  }, [urlParams?.query, noOffering, weekdays, onlineOffering, startTime, endTime]);

  useEffect(() => {
    setLoading(true);
    let dateStr = convertDateToStr(weekdays);
    let startTimeF = convertTimeToFloat(startTime);
    let endTimeF = convertTimeToFloat(endTime);
    fetchCoursesBySearch(
      urlParams?.query,
      user?.userID,
      pageIndex,
      12,
      noOffering,
      onlineOffering,
      dateStr,
      startTimeF,
      endTimeF
    ).then(({ data, total }) => {
      let newCourses = courses.concat(data);
      setCourses(newCourses);
      setNumResults(total);
      setHasMore(data.length > 0);
      setLoading(false);
    });
  }, [pageIndex]);

  // clean up
  useEffect(() => {
    return () => {
      setCourses([]);
    };
  }, []);

  return (
    <>
      <FilterContext.Provider
        value={{
          noOffering,
          setNoOffering,
          setOnlineOffering,
          onlineOffering,
          setWeekdays,
          setStartTimeClock,
          setEndTimeClock,
        }}
      >
        <FilterGroup />
        <ContainerWithStaticScheduler shouldShowScheduler={shouldShowScheduler}>
          <ContainerWithLoadingIndication isLoading={courses.length === 0 && numResults !== 0}>
            <Scrollbars autoHide>
              <Stack padding='24px' spacing='16px'>
                <Typography variant='body2' gutterBottom>
                  Found {numResults} results for <b>"{urlParams.query}"</b>
                </Typography>
                <Stack spacing='24px'>
                  {courses?.map((course, i) => {
                    if (courses?.length === i + 1) {
                      return (
                        // need a div here otherwise gives warning from useRef
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
                  {numResults === 0 && (
                    <Lottie
                      loop
                      animationData={emptyResult}
                      play
                      style={{
                        width: '50%',
                        height: '50%',
                        marginLeft: '10em',
                        marginTop: '5em',
                      }}
                    />
                  )}
                </Stack>
              </Stack>
              {courses.length !== 0 && loading && numResults !== 0 && (
                <LinearProgress sx={{ height: 8 }} />
              )}
            </Scrollbars>
          </ContainerWithLoadingIndication>
        </ContainerWithStaticScheduler>
      </FilterContext.Provider>
    </>
  );
}

const convertDateToStr = (days) => {
  const dateMapping = {
    '1': 'Mo',
    '2': 'Tu',
    '3': 'We',
    '4': 'Th',
    '5': 'Fr',
  };
  let weekdayStr = '';
  for (let day of days) weekdayStr += dateMapping[day];
  return weekdayStr;
};

const convertTimeToFloat = (time) => {
  if (!time || time === '') return 0;
  // this should be modified
  let hour = parseFloat(time[0]?.charAt(0) + time[0]?.charAt(1));
  let mins = 0;
  if (time[0]?.charAt(3) === '0') {
    mins = 0.01 * parseFloat(time[0]?.charAt(4));
  } else {
    mins = 0.1 * parseFloat(time[0]?.charAt(3)) + 0.01 * parseFloat(time[0]?.charAt(4));
  }
  return hour + mins;
};
