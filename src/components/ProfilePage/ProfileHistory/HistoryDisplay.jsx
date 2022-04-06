import { Class } from '@mui/icons-material';
import { Box, Collapse, List, Stack, Card, Skeleton } from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TransitionGroup } from 'react-transition-group';
import SmallCourseListItem from '../SmallCourseListItem';

/**
 * The right half of the profile page history tab that shows what the user has in their course
 * history.
 */
export default function HistoryDisplay({ historyCourses, onRemoveHistoryCourse = null }) {
  const listContainerRef = useRef();
  const [shouldListShowTransition, setShouldListShowTransition] = useState(false);

  useEffect(() => {
    if (historyCourses) {
      listContainerRef?.current?.scrollToTop();
      requestAnimationFrame(() => setShouldListShowTransition(true));
    }
  }, [historyCourses]);

  const handleCourseActionItemClick = (course, action) => {
    switch (action) {
      case 'info':
        window.open('/course/' + course.id, '_blank');
        break;
      case 'remove':
        onRemoveHistoryCourse?.(course);
        break;
      default:
        break;
    }
  };

  return (
    <Stack height='100%' minHeight={0}>
      <Card sx={{ zIndex: 99 }}>
        <Stack padding='20px' spacing='12px'>
          <LabelWithIcon
            iconType={Class}
            label='Courses you have taken'
            variant='overline'
            size='small'
          />
          {/* TODO Q: The following is a placeholder for the history breakdown vis. */}
          <Stack direction='row' spacing='8px'>
            <Skeleton animation='wave' width='38.2%' height='56px' />
            <Skeleton animation='wave' width='23.6%' height='56px' />
            <Skeleton animation='wave' width='14.6%' height='56px' />
            <Skeleton animation='wave' width='9%' height='56px' />
            <Skeleton animation='wave' width='14.6%' height='56px' />
          </Stack>
        </Stack>
      </Card>
      {/* The 16px of extra width is for showing the scrollbar to the right of list (rather
       *  than showing it half-transparent above the list). */}
      <Box flex={1} minHeight={0} width='calc(100% + 16px)'>
        <Scrollbars ref={listContainerRef}>
          <List
            sx={{
              width: 'calc(100% - 16px)',
              maxHeight: 'calc(100% - 16px)',
              '> *:last-child': { paddingBottom: '28px' },
            }}
          >
            <TransitionGroup>
              {historyCourses.map((course) => (
                <Collapse key={course.id} timeout={shouldListShowTransition ? undefined : 0}>
                  <SmallCourseListItem
                    course={course}
                    autoHideActionItems
                    actionItems={['info', 'remove']}
                    onActionItemClick={handleCourseActionItemClick}
                  />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Scrollbars>
      </Box>
    </Stack>
  );
}
