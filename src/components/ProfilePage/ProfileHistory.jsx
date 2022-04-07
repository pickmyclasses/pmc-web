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
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { formatCourseName, useMount } from 'utils';
import AddToHistorySearchList from './ProfileHistory/AddToHistorySearchList';
import HistoryDisplay from './ProfileHistory/HistoryDisplay';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';

/** The schedule tab of the user profile page. */
export default function ProfileHistory() {
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  /** The list of courses to show in the history area (right half of the tab). */
  const [historyCourses, setHistoryCourses] = useState(null);

  /** The list of courses to show in the search area (left half of the tab). */
  const [searchResultCourses, setSearchResultCourses] = useState([]);

  // The history data is only fetched once when this tab is rendered. This component then
  // assumes the history is always up-to-date and shows any changes the user makes in real-time
  // without refetching any data from the backend.
  //
  // The fetched data is reversed by default to show the most recent addition first and old
  // courses last.
  useMount(() =>
    fetchHistoryCourses(user.userID).then((courses) => setHistoryCourses(courses.reverse()))
  );

  const handleSearch = (query) => {
    fetchCoursesBySearch({ keyword: query, pageSize: 6 }).then(setSearchResultCourses);
  };

  const handleAddHistoryCourse = (course, shouldUpdateViewOnly = false) => {
    setHistoryCourses([course, ...historyCourses.filter((x) => x.id !== course.id)]);
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
    setHistoryCourses(historyCourses.filter((x) => x.id !== course.id));
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
    <ContainerWithLoadingIndication isLoading={!historyCourses}>
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
              historyCourses={historyCourses}
              onSearch={handleSearch}
              onAddHistoryCourse={handleAddHistoryCourse}
              onRemoveHistoryCourse={handleRemoveHistoryCourse}
            />
          </Grid>
          <Divider orientation='vertical' />
          <Grid item xs={7} paddingLeft='24px' height='100%'>
            <HistoryDisplay
              historyCourses={historyCourses}
              onRemoveHistoryCourse={handleRemoveHistoryCourse}
            />
          </Grid>
        </Grid>
      </Stack>
    </ContainerWithLoadingIndication>
  );
}
