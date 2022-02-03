import React from 'react';
import { Box, CircularProgress, Divider, useTheme } from '@mui/material';
import ShoppingCart from './ShoppingCart';
import RequirementList from './RequirementList';

/**
 * The scheduler panel, which includes the shopping cart and the requirement list.
 */
export default function Scheduler({
  isLoading = false,
  classesInShoppingCart = [],
  requirements = [],
}) {
  const theme = useTheme();

  const renderLoadingIndication = () => <CircularProgress sx={{ margin: 'auto' }} />;

  const renderSchedulerContent = () => (
    <>
      <Box sx={{ flex: 1 }}>
        <ShoppingCart classes={classesInShoppingCart} />
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
      <div style={{ marginBottom: '24px' }}>Requirements</div>
      <RequirementList requirements={requirements} />
    </>
  );

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
      <div style={{ marginBottom: '24px' }}>Shopping Cart</div>
      {isLoading ? renderLoadingIndication() : renderSchedulerContent()}
    </Box>
  );
}
