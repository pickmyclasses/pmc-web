import { Class } from '@mui/icons-material';
import { Box, Collapse, List, Stack, Card, Skeleton } from '@mui/material';
import { getRequirementsFromScheduleAndHistory } from 'api';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TransitionGroup } from 'react-transition-group';
import SmallCourseListItem from '../SmallCourseListItem';
import HistoryBreakdownChart from './HistoryBreakdownChart';

/**
 * The right half of the profile page history tab that shows what the user has in their course
 * history.
 */
export default function HistoryDisplay({ historyCourses, onRemoveHistoryCourse = null }) {
  const { classesInShoppingCart, requirements } = useContext(SchedulerContext);
  const listContainerRef = useRef();

  const [shouldListShowTransition, setShouldListShowTransition] = useState(false);
  const [historyBreakdown, setHistoryBreakdown] = useState(requirements);

  // Scroll to the top of list every time its content changes.
  useEffect(() => {
    if (historyCourses) {
      listContainerRef?.current?.scrollToTop();
      requestAnimationFrame(() => setShouldListShowTransition(true));
    }
  }, [historyCourses]);

  useEffect(() => {
    const copyOfRequirements = requirements.map((x) => ({
      ...x,
      completedCourses: [],
      inProgressCourses: [],
    }));
    setHistoryBreakdown(
      getRequirementsFromScheduleAndHistory(
        copyOfRequirements,
        classesInShoppingCart.map((x) => x.course),
        historyCourses
      )
    );
  }, [classesInShoppingCart, historyCourses, requirements]);

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
      <Card sx={{ zIndex: 99, overflow: 'visible' }}>
        <Stack padding='20px' spacing='12px'>
          <LabelWithIcon
            iconType={Class}
            label='Courses you have taken'
            variant='overline'
            size='small'
          />
          <HistoryBreakdownChart historyBreakdown={historyBreakdown} />
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
