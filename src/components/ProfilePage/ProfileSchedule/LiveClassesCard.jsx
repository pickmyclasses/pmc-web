import { EventNote } from '@mui/icons-material';
import { Box, Card, Stack } from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import ShoppingCart from 'components/Scheduler/ShoppingCart';
import React from 'react';

/**
 * The card in the profile page schedule tab that shows with an editable timeline details of
 * classes and custom events the user has for the next semester.
 *
 * @param {Object} props
 * @param {Array<{classData, course}>} props.classesInShoppingCart The list of classes the user
 *     has in their shopping cart, along with their corresponding courses.
 */
export default function LiveClassesCard({ classesInShoppingCart }) {
  return (
    // The following `overflow: unset` style enables the sticky feature of the column titles
    // above the timeline. (The style `position: sticky` does not allow any non-scrollable
    // parent of sticky element to have `overflow: hidden` set.)
    <Card sx={{ overflow: 'unset' }}>
      <Stack padding='24px' spacing='24px'>
        <LabelWithIcon
          iconType={EventNote}
          color='action'
          label='Live Courses & Recurrent Events'
          variant='overline'
        />
        <Box height='1728px'>
          <ShoppingCart
            classes={classesInShoppingCart}
            timelineColumnTitles={timelineColumnTitles}
            // Default time range: 7:30am - 10pm
            defaultRangeStart={7.5 * 3600}
            defaultRangeEnd={22 * 3600}
            noSummary
            showShadowUnderColumnTitles
            showHalfHourMarks
            expandAllTimeOnMarks
            largerTimeOnMarks
            showDetailsInTimeBlocks
            showTimeDataCardInside
          />
        </Box>
      </Stack>
    </Card>
  );
}

const timelineColumnTitles = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
