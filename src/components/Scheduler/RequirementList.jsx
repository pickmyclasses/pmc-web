import React, { useContext } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import ClickableIndicator from 'components/CourseCardGrid/CourseCard/ClickableIndicator';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';

/**
 * The requirement list resides in the bottom part of the scheduler.
 *
 * @param {{
 *   requirements: {
 *     title: string,
 *     progress: number,
 *     total: number,
 *   }[],
 * }} props
 */
export default function RequirementList({ requirements = [] }) {
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const theme = useTheme();

  if (!requirements?.length) return null;

  return (
    <Stack spacing='8px'>
      <ClickableIndicator onClick={() => navigateIfAllowed('/profile/roadmap')}>
        <Typography variant='subtitle2'>Requirements</Typography>
      </ClickableIndicator>
      {requirements.map(
        ({ title, completedCourses, inProgressCourses, numRequiredCourses }) => (
          <Typography
            variant='body2'
            key={title}
            style={{ color: theme.palette.text.secondary }}
          >
            {title}: {Math.min(completedCourses.length, numRequiredCourses)}/
            {numRequiredCourses}{' '}
            {inProgressCourses.length > 0 ? `(+${inProgressCourses.length} scheduled)` : ''}
          </Typography>
        )
      )}
    </Stack>
  );
}
