import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme();

  if (!requirements?.length) return null;

  return (
    <Stack spacing='8px'>
      <Typography variant='subtitle1'>Requirements</Typography>
      {requirements.map(({ title, progress, total }) => (
        <div key={title} style={{ color: theme.palette.text.secondary }}>
          {title}: {progress}/{total}
        </div>
      ))}
    </Stack>
  );
}
