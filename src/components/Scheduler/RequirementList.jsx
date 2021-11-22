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
      <div style={{ marginBottom: '24px' }}>Requirements</div>
      {requirements.map(({ title, progress, total }) => (
        <div key={title} style={{ color: theme.palette.text.secondary, lineHeight: '2em' }}>
          {title}: {progress}/{total}
        </div>
      ))}
    </Box>
  );
}
