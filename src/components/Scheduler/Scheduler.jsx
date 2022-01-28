import React from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import ShoppingCart from './ShoppingCart';
import RequirementList from './RequirementList';

/**
 * The scheduler panel, which includes the shopping cart and the requirement list.
 *
 * @param {{
 *   requirements: {
 *     title: string,
 *     progress: number,
 *     total: number,
 *   }[],
 * }} props
 */
export default function Scheduler({ requirements = [] }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: '1px solid',
        boxSizing: 'border-box',
        borderColor: theme.palette.divider,
        borderRadius: '8px',
        width: '100%',
        height: '100%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ShoppingCart />
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
      <RequirementList requirements={requirements} />
    </Box>
  );
}
