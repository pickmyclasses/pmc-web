import React from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import ShoppingCart from './Scheduler/ShoppingCart';
import RequirementList from './Scheduler/RequirementList';

/** The scheduler panel, which includes the shopping cart and the requirement list. */
export default function Scheduler() {
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
      <RequirementList />
    </Box>
  );
}
