import React from 'react';
import { Box, useTheme } from '@mui/material';

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

  return (
    <Box>
      {requirements.map(({ title, progress, total }) => (
        <div key={title} style={{ color: theme.palette.text.secondary, lineHeight: '1.67em' }}>
          {title}: {progress}/{total}
        </div>
      ))}
    </Box>
  );
}
