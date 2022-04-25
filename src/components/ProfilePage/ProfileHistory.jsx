import { History } from '@mui/icons-material';
import { Divider, Grid, Stack } from '@mui/material';
import {
  addOrUpdateHistoryCourse,
  fetchCoursesBySearch,
  fetchHistoryCourses,
  removeHistoryCourse,
} from 'api';
import { UserContext } from 'App';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { formatCourseName, useMount } from 'utils';
import AddToHistorySearchList from './ProfileHistory/AddToHistorySearchList';
import HistoryDisplay from './ProfileHistory/HistoryDisplay';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';

/** The schedule tab of the user profile page. */
export default function ProfileHistory() {
  const { user } = useContext(UserContext);
  const { historyCourses } = useContext(SchedulerContext);
  const { enqueueSnackbar } = useSnackbar();

  /** The list of courses to show in the history area (right half of the tab). */
  const [shownHistoryCourses, setShownHistoryCourses] = useState(null);

  /** The list of courses to show in the search area (left half of the tab). */
  const [searchResultCourses, setSearchResultCourses] = useState([]);

  // This component assumes the history is always up-to-date and shows any changes the user
  // makes in real-time without refetching any data from the backend.
  //
  // The fetched data is reversed by default to show the most recent addition first and old
  // courses last.
  useEffect(() => setShownHistoryCourses(historyCourses.concat().reverse()), [historyCourses]);

  const handleSearch = (query) =>
    fetchCoursesBySearch(query, user, 0, 8).then(({ data }) => setSearchResultCourses(data));

  const handleAddHistoryCourse = (course, shouldUpdateViewOnly = false) => {
    setShownHistoryCourses([course, ...shownHistoryCourses.filter((x) => x.id !== course.id)]);
    if (!shouldUpdateViewOnly) {
      addOrUpdateHistoryCourse(user.userID, course.id).catch(() => {
        enqueueSnackbar(
          `Failed to add ${formatCourseName(course.catalogCourseName)} to your course history.`,
          { variant: 'error' }
        );
        handleRemoveHistoryCourse(course, true);
      });
    }
  };

  const handleRemoveHistoryCourse = (course, shouldUpdateViewOnly = false) => {
    setShownHistoryCourses(shownHistoryCourses.filter((x) => x.id !== course.id));
    if (!shouldUpdateViewOnly) {
      removeHistoryCourse(user.userID, course.id).catch(() => {
        enqueueSnackbar(
          `Failed to remove ${formatCourseName(
            course.catalogCourseName
          )} from your course history.`,
          { variant: 'error' }
        );
        handleAddHistoryCourse(course, true);
      });
    }
  };

  return (
    <ContainerWithLoadingIndication isLoading={!shownHistoryCourses}>
      <Stack spacing='24px' height='100%'>
        <ProfilePageTabHeadingCard
          iconType={History}
          title='Your History of Courses'
          description='Tell us what courses you have taken for more personalized content and recommendation'
        />
        <Grid container flex={1} minHeight={0} flexWrap='nowrap'>
          <Grid item xs={5} paddingRight='24px' height='100%'>
            <AddToHistorySearchList
              searchResultCourses={searchResultCourses}
              historyCourses={shownHistoryCourses}
              onSearch={handleSearch}
              onAddHistoryCourse={handleAddHistoryCourse}
              onRemoveHistoryCourse={handleRemoveHistoryCourse}
            />
          </Grid>
          <Divider orientation='vertical' />
          <Grid item xs={7} paddingLeft='24px' height='100%'>
            <HistoryDisplay
              historyCourses={shownHistoryCourses}
              onRemoveHistoryCourse={handleRemoveHistoryCourse}
            />
          </Grid>
        </Grid>
      </Stack>
    </ContainerWithLoadingIndication>
  );
}
