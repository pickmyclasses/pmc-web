import { Box, Card, Collapse, List, Stack, Typography } from '@mui/material';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import SearchBar from 'components/Search/SearchBar';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TransitionGroup } from 'react-transition-group';
import SmallCourseListItem from '../SmallCourseListItem';

/**
 * The left half of the profile page history tab that offers a search function for the user to
 * select what courses they've taken.
 *
 * @param {Object} props
 * @param {Array<Object>} props.searchResultCourses The list of courses to show as the search
 *     result.
 * @param {Array<Object>} props.historyCourses The user's course history.
 * @param {Boolean} props.isUserFreshman Only used to help determine the search bar's
 *     placeholder text.
 * @param {(query: String) => void} props.onSearch The callback for when the user triggers a
 *     search with some non-empty query.
 * @param {(course: Object) => void} props.onAddHistoryCourse The callback for when the user
 *     selects a course to add to their history.
 * @param {(course: Object) => void} props.onRemoveHistoryCourse The callback for when the user
 *     selects a course to remove from their history.
 */
export default function AddToHistorySearchList({
  searchResultCourses = null,
  historyCourses = null,
  isUserFreshman = false,
  onSearch = null,
  onAddHistoryCourse = null,
  onRemoveHistoryCourse = null,
}) {
  /** Whether to show transitions for adding and removing items from the list. */
  const [shouldListShowTransitions, setShouldListShowTransitions] = useState(false);

  /** Whether it should show the loading indication for loading the search results. */
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  // Handles when a search completes.
  useEffect(() => {
    if (searchResultCourses) {
      setIsLoadingResults(false);
      requestAnimationFrame(() => setShouldListShowTransitions(true));
    }
  }, [searchResultCourses]);

  const handleCourseActionItemClick = (course, action) => {
    switch (action) {
      case 'info':
        window.open('/course/' + course.id, '_blank');
        break;
      case 'add':
        onAddHistoryCourse?.(course);
        break;
      case 'remove':
        onRemoveHistoryCourse?.(course);
        break;
      default:
        break;
    }
  };

  const renderCourseListItem = (course) => {
    const isCourseTaken = !!historyCourses.find((x) => x.id === course.id);
    return (
      <Collapse key={course.id} timeout={shouldListShowTransitions ? undefined : 0}>
        <SmallCourseListItem
          autoHideActionItems
          course={course}
          indicator={isCourseTaken ? 'taken-check' : undefined}
          actionItems={['info', isCourseTaken ? 'remove' : 'add']}
          defaultActionItem={isCourseTaken ? undefined : 'add'}
          onActionItemClick={handleCourseActionItemClick}
        />
      </Collapse>
    );
  };

  return (
    <Stack height='100%' minHeight={0}>
      <Card sx={{ zIndex: 99 }}>
        <Stack padding='20px' spacing='12px'>
          <Typography variant='h6'>Add a past course</Typography>
          <SearchBar
            placeholderText={
              historyCourses?.length
                ? 'What other courses have you taken?'
                : isUserFreshman
                ? 'What courses have you taken?'
                : 'What did you take last semester?'
            }
            searchIconColor='text.disabled'
            onSearch={(query, wasAutoSearch) => {
              if (!query) return;
              if (!wasAutoSearch) setIsLoadingResults(true);
              setShouldListShowTransitions(false);
              onSearch(query);
            }}
            autoSearchOnChange
          />
        </Stack>
      </Card>
      {/* The 16px of extra width is for showing the scrollbar to the right of list (rather
       *  than showing it half-transparent above the list). */}
      <Box flex={1} minHeight={0} width='calc(100% + 16px)'>
        <ContainerWithLoadingIndication isLoading={isLoadingResults}>
          {searchResultCourses && (
            <Scrollbars>
              <List
                sx={{
                  width: 'calc(100% - 16px)',
                  maxHeight: 'calc(100% - 16px)',
                  '> *:last-child': { paddingBottom: '28px' },
                }}
              >
                <TransitionGroup>
                  {searchResultCourses.map((x) => renderCourseListItem(x))}
                </TransitionGroup>
              </List>
            </Scrollbars>
          )}
        </ContainerWithLoadingIndication>
      </Box>
    </Stack>
  );
}
