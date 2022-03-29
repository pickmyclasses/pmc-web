import { Computer } from '@mui/icons-material';
import { Card, Stack, Typography } from '@mui/material';
import CourseCardGrid from 'components/CourseCardGrid/CourseCardGrid';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import React from 'react';

/**
 * The card in the profile page schedule tab that displays the list of classes the user has
 * online which can't be shown in the timeline in the live classes card.
 *
 * @param {Object} props
 * @param {Array<{classData, course}>} props.classesAndCourses The list of asynchronous classes,
 *     along with their corresponding course data.
 */
export default function AsyncClassesCard({ classesAndCourses }) {
  return (
    <Card>
      <Stack padding='24px' spacing='12px'>
        <LabelWithIcon
          color='action'
          iconType={Computer}
          label='Asynchronous Courses'
          variant='overline'
        />
        {classesAndCourses.length > 0 ? (
          // TODO Q: The following card grid is only a placeholder. Eventually we should list
          // the classes in a more easily-readable fashion.
          <CourseCardGrid
            numColumns={4}
            courses={classesAndCourses.map((x) => ({
              tags: [],
              classes: [x.classData],
              ...x.course,
            }))}
          />
        ) : (
          <Typography>
            You don't have any asynchronous (e.g. online) courses in your schedule.
          </Typography>
        )}
      </Stack>
    </Card>
  );
}
