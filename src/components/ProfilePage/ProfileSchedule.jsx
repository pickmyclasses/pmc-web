import React, { useContext } from 'react';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { Computer } from '@mui/icons-material';
import ShoppingCart from '../Scheduler/ShoppingCart';
import { EventNote } from '@mui/icons-material';
import LabelWithIcon from '../CoursePage/LabelWithIcon';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import CourseCardGrid from '../CourseCardGrid/CourseCardGrid';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';

/** The schedule tab of the user profile page. */
export default function ProfileSchedule() {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  return (
    <ContainerWithLoadingIndication isLoading={!classesInShoppingCart}>
      <Stack spacing='32px'>
        <Card>
          <Stack padding='24px' spacing='24px' direction='row' alignItems='center'>
            <EventNote fontSize='large' color='action' />
            <Stack>
              <Typography variant='h6' gutterBottom>
                Your Schedule
              </Typography>
              <Typography fontStyle='italic'>
                View and manage your courses and other weekly events
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ overflow: 'unset' }}>
          <Stack padding='24px' spacing='24px'>
            <LabelWithIcon
              color='action'
              iconType={Computer}
              label='Asynchronous Courses'
              variant='overline'
            />
            <CourseCardGrid
              numColumns={4}
              courses={classesInShoppingCart.map((x) => ({
                tags: [],
                classes: [x.classData],
                ...x.course,
              }))}
            />
            <Divider />
            <LabelWithIcon
              iconType={EventNote}
              color='action'
              label='Live Courses & Recurrent Events'
              variant='overline'
            />
            <Box height='2400px'>
              <ShoppingCart
                classes={classesInShoppingCart}
                timelineColumnTitles={timelineColumnTitles}
                defaultRangeStart={7.5 * 3600}
                defaultRangeEnd={22 * 3600}
                noSummary
                showShadowUnderColumnTitles
                showHalfHourMarks
                expandAllTimeOnMarks
                largerTimeOnMarks
              />
            </Box>
          </Stack>
        </Card>
      </Stack>
    </ContainerWithLoadingIndication>
  );
}

const timelineColumnTitles = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
